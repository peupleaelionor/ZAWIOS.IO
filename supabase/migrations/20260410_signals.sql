-- ============================================================
-- ZAWIOS — Signals + Tri-state Voting Schema
-- Run via: supabase db push  OR  psql < this_file.sql
-- ============================================================

-- ── signals ──────────────────────────────────────────────────────────────────

create table if not exists public.signals (
  id              uuid primary key default gen_random_uuid(),
  title           text                     not null check (char_length(title) between 5 and 280),
  description     text                     not null default '',
  category        text                     not null,
  region          text                     not null default 'global',
  status          text                     not null default 'active' check (status in ('active', 'resolved')),
  yes_percent     numeric(5,2)             not null default 50 check (yes_percent between 0 and 100),
  no_percent      numeric(5,2)             not null default 50 check (no_percent between 0 and 100),
  neutral_percent numeric(5,2)             not null default 0  check (neutral_percent between 0 and 100),
  total_votes     integer                  not null default 0  check (total_votes >= 0),
  created_by      uuid                     references auth.users(id) on delete set null,
  creator_name    text,
  trending        boolean                  not null default false,
  hot             boolean                  not null default false,
  resolved_result boolean,
  expires_at      timestamptz,
  created_at      timestamptz              not null default now(),
  updated_at      timestamptz              not null default now(),

  constraint percents_sum check (
    abs((yes_percent + no_percent + neutral_percent) - 100) < 0.1
  ),
  constraint valid_category check (category in (
    'worldview','news','tech','business','crypto','sports',
    'culture','society','entertainment','trends','fun'
  )),
  constraint valid_region check (region in (
    'global','africa','france','europe','usa','rdc','belgique'
  ))
);

comment on table public.signals is 'ZAWIOS crowd-intelligence signals with tri-state voting';

-- ── signal_votes ──────────────────────────────────────────────────────────────

create table if not exists public.signal_votes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid         not null references auth.users(id) on delete cascade,
  signal_id   uuid         not null references public.signals(id) on delete cascade,
  vote_type   text         not null check (vote_type in ('yes', 'no', 'neutral')),
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now(),

  constraint one_vote_per_signal unique (user_id, signal_id)
);

comment on table public.signal_votes is 'Tri-state votes per user per signal (yes / no / neutral)';

-- ── Regional breakdown (optional JSON column) ─────────────────────────────────

alter table public.signals
  add column if not exists regional_breakdown jsonb;

comment on column public.signals.regional_breakdown is
  'JSON map: region → YES% among committed voters in that region';

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index if not exists signals_category_idx   on public.signals (category);
create index if not exists signals_region_idx     on public.signals (region);
create index if not exists signals_status_idx     on public.signals (status);
create index if not exists signals_created_at_idx on public.signals (created_at desc);
create index if not exists signals_total_votes_idx on public.signals (total_votes desc);
create index if not exists signal_votes_user_idx  on public.signal_votes (user_id);
create index if not exists signal_votes_signal_idx on public.signal_votes (signal_id);

-- ── updated_at trigger ────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists signals_updated_at on public.signals;
create trigger signals_updated_at
  before update on public.signals
  for each row execute function public.set_updated_at();

drop trigger if exists signal_votes_updated_at on public.signal_votes;
create trigger signal_votes_updated_at
  before update on public.signal_votes
  for each row execute function public.set_updated_at();

-- ── Vote count recalculation trigger ─────────────────────────────────────────

create or replace function public.recalc_signal_vote_counts()
returns trigger language plpgsql security definer as $$
declare
  v_signal_id uuid;
  v_total     integer;
  v_yes       integer;
  v_no        integer;
  v_neutral   integer;
begin
  v_signal_id := coalesce(new.signal_id, old.signal_id);

  select
    count(*),
    count(*) filter (where vote_type = 'yes'),
    count(*) filter (where vote_type = 'no'),
    count(*) filter (where vote_type = 'neutral')
  into v_total, v_yes, v_no, v_neutral
  from public.signal_votes
  where signal_id = v_signal_id;

  if v_total = 0 then
    update public.signals
    set yes_percent = 50, no_percent = 50, neutral_percent = 0, total_votes = 0
    where id = v_signal_id;
  else
    update public.signals
    set
      yes_percent     = round((v_yes::numeric     / v_total) * 100, 2),
      no_percent      = round((v_no::numeric      / v_total) * 100, 2),
      neutral_percent = round((v_neutral::numeric / v_total) * 100, 2),
      total_votes     = v_total
    where id = v_signal_id;
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists signal_vote_counts_insert on public.signal_votes;
create trigger signal_vote_counts_insert
  after insert on public.signal_votes
  for each row execute function public.recalc_signal_vote_counts();

drop trigger if exists signal_vote_counts_update on public.signal_votes;
create trigger signal_vote_counts_update
  after update on public.signal_votes
  for each row execute function public.recalc_signal_vote_counts();

drop trigger if exists signal_vote_counts_delete on public.signal_votes;
create trigger signal_vote_counts_delete
  after delete on public.signal_votes
  for each row execute function public.recalc_signal_vote_counts();

-- ── RPC: get_signal_feed ──────────────────────────────────────────────────────

create or replace function public.get_signal_feed(
  p_category  text    default null,
  p_region    text    default null,
  p_sort      text    default 'trending',   -- 'trending' | 'latest' | 'popular'
  p_limit     integer default 20,
  p_offset    integer default 0,
  p_user_id   uuid    default null
)
returns table (
  id              uuid,
  title           text,
  description     text,
  category        text,
  region          text,
  status          text,
  yes_percent     numeric,
  no_percent      numeric,
  neutral_percent numeric,
  total_votes     integer,
  created_by      uuid,
  creator_name    text,
  trending        boolean,
  hot             boolean,
  resolved_result boolean,
  expires_at      timestamptz,
  created_at      timestamptz,
  regional_breakdown jsonb,
  user_vote       text    -- null | 'yes' | 'no' | 'neutral'
)
language sql stable security definer as $$
  select
    s.id, s.title, s.description, s.category, s.region, s.status,
    s.yes_percent, s.no_percent, s.neutral_percent, s.total_votes,
    s.created_by, s.creator_name,
    s.trending, s.hot, s.resolved_result, s.expires_at, s.created_at,
    s.regional_breakdown,
    sv.vote_type as user_vote
  from public.signals s
  left join public.signal_votes sv
    on sv.signal_id = s.id and sv.user_id = p_user_id
  where s.status = 'active'
    and (p_category is null or p_category = 'all' or s.category = p_category)
    and (p_region   is null or p_region   = 'all' or s.region   = p_region)
  order by
    case p_sort
      when 'popular'  then s.total_votes
      else 0
    end desc,
    case p_sort
      when 'latest'   then extract(epoch from s.created_at)::bigint
      when 'trending' then s.total_votes  -- simplified; real momentum needs votes_last_hour
      else 0
    end desc,
    s.hot desc,
    s.created_at desc
  limit  least(p_limit, 100)
  offset p_offset;
$$;

-- ── RPC: get_leaderboard ──────────────────────────────────────────────────────

create or replace function public.get_leaderboard(
  p_limit   integer default 25,
  p_offset  integer default 0
)
returns table (
  user_id         uuid,
  username        text,
  full_name       text,
  avatar_url      text,
  plan            text,
  total_score     integer,
  accuracy_rate   numeric,
  prediction_count integer,
  global_rank     integer
)
language sql stable security definer as $$
  select
    p.user_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.plan::text,
    coalesce(r.total_score, 0)       as total_score,
    coalesce(r.accuracy_rate, 0)     as accuracy_rate,
    coalesce(r.prediction_count, 0)  as prediction_count,
    coalesce(r.global_rank, 9999)    as global_rank
  from public.profiles p
  left join public.reputation_scores r on r.user_id = p.user_id
  order by coalesce(r.total_score, 0) desc
  limit  least(p_limit, 100)
  offset p_offset;
$$;

-- ── RLS Policies ──────────────────────────────────────────────────────────────

alter table public.signals       enable row level security;
alter table public.signal_votes  enable row level security;

-- Signals: anyone can read active signals
drop policy if exists "signals_select_active" on public.signals;
create policy "signals_select_active"
  on public.signals for select
  using (status = 'active' or auth.uid() = created_by);

-- Signals: authenticated users can insert
drop policy if exists "signals_insert_auth" on public.signals;
create policy "signals_insert_auth"
  on public.signals for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Signal votes: users can read their own votes
drop policy if exists "signal_votes_select_own" on public.signal_votes;
create policy "signal_votes_select_own"
  on public.signal_votes for select
  to authenticated
  using (auth.uid() = user_id);

-- Signal votes: users can insert their own votes
drop policy if exists "signal_votes_insert_own" on public.signal_votes;
create policy "signal_votes_insert_own"
  on public.signal_votes for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Signal votes: users can update their own votes (change yes→no→neutral)
drop policy if exists "signal_votes_update_own" on public.signal_votes;
create policy "signal_votes_update_own"
  on public.signal_votes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Signal votes: users can delete their own votes
drop policy if exists "signal_votes_delete_own" on public.signal_votes;
create policy "signal_votes_delete_own"
  on public.signal_votes for delete
  to authenticated
  using (auth.uid() = user_id);

-- ── Grant RPC execution ───────────────────────────────────────────────────────

grant execute on function public.get_signal_feed   to authenticated, anon;
grant execute on function public.get_leaderboard   to authenticated, anon;
grant execute on function public.set_updated_at    to authenticated;

-- ── Done ──────────────────────────────────────────────────────────────────────
-- Run `supabase db push` or apply via the Supabase dashboard SQL editor.
