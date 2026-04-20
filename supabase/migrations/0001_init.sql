-- ═══════════════════════════════════════════════════════════════════
-- ZAWIOS — Base minimale propre v1
-- ═══════════════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ── users ────────────────────────────────────────────────────────────
create table if not exists public.users (
  id          uuid        primary key references auth.users(id) on delete cascade,
  handle      text        not null unique check (char_length(handle) between 3 and 32),
  display_name text,
  avatar_url  text,
  locale      text        not null default 'fr' check (locale in ('fr', 'en')),
  -- Reputation
  accuracy_rate    numeric(5,2) not null default 0  check (accuracy_rate between 0 and 100),
  prediction_count int          not null default 0,
  reputation_score numeric(8,2) not null default 0,
  -- Anti-spam weights
  trust_weight     numeric(4,3) not null default 1.0 check (trust_weight between 0 and 1),
  -- Moderation
  is_banned   boolean     not null default false,
  is_admin    boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists users_handle_idx on public.users (handle);
create index if not exists users_reputation_idx on public.users (reputation_score desc);

-- ── signals ──────────────────────────────────────────────────────────
create type signal_status as enum ('draft', 'active', 'resolved', 'archived', 'rejected');
create type signal_impact  as enum ('local', 'structurel', 'civilisationnel');

create table if not exists public.signals (
  id              uuid         primary key default gen_random_uuid(),
  title_fr        text         not null check (char_length(title_fr) between 10 and 280),
  title_en        text         check (char_length(title_en) between 10 and 280),
  description_fr  text,
  description_en  text,
  category        text         not null,
  region_scope    text         not null default 'global',
  horizon         text         not null default '1-3 ans',
  impact          signal_impact not null default 'structurel',
  resolution_date date,
  resolution_fr   text,
  resolution_en   text,
  -- Voting aggregates (denormalized for perf)
  vote_count      int          not null default 0,
  yes_count       int          not null default 0,
  no_count        int          not null default 0,
  abstain_count   int          not null default 0,
  yes_percent     numeric(5,2) not null default 50,
  no_percent      numeric(5,2) not null default 50,
  -- Weighted aggregates (by reputation)
  yes_weighted    numeric(10,4) not null default 0,
  no_weighted     numeric(10,4) not null default 0,
  -- Scoring
  novelty_score   numeric(5,2) not null default 0,
  toxicity_risk   numeric(5,2) not null default 0,
  viral_score     numeric(5,2) not null default 0,
  -- Meta
  status          signal_status not null default 'draft',
  created_by      uuid         references public.users(id) on delete set null,
  cover_url       text,
  tags            text[]       not null default '{}',
  created_at      timestamptz  not null default now(),
  updated_at      timestamptz  not null default now(),
  published_at    timestamptz
);

create index if not exists signals_status_idx    on public.signals (status, published_at desc);
create index if not exists signals_category_idx  on public.signals (category, status);
create index if not exists signals_viral_idx     on public.signals (viral_score desc) where status = 'active';
create index if not exists signals_region_idx    on public.signals (region_scope, status);

-- ── votes ─────────────────────────────────────────────────────────────
create type vote_choice as enum ('yes', 'no', 'abstain');

create table if not exists public.votes (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  signal_id   uuid        not null references public.signals(id) on delete cascade,
  choice      vote_choice not null,
  weight      numeric(4,3) not null default 1.0,
  created_at  timestamptz not null default now(),
  unique (user_id, signal_id)
);

create index if not exists votes_signal_idx on public.votes (signal_id, choice);
create index if not exists votes_user_idx   on public.votes (user_id, created_at desc);

-- ── vote_nuance_tags ──────────────────────────────────────────────────
create table if not exists public.vote_nuance_tags (
  id          uuid        primary key default gen_random_uuid(),
  vote_id     uuid        not null references public.votes(id) on delete cascade,
  tag         text        not null check (tag in (
    'depends_region', 'depends_income', 'depends_age',
    'depends_time', 'need_more_data', 'too_complex',
    'both_sides', 'depends_country', 'short_term_yes_long_no',
    'long_term_yes_short_no'
  )),
  created_at  timestamptz not null default now(),
  unique (vote_id, tag)
);

create index if not exists nuance_tags_vote_idx on public.vote_nuance_tags (vote_id);

-- ── hotd ──────────────────────────────────────────────────────────────
create type hotd_status as enum ('scheduled', 'live', 'done', 'cancelled');

create table if not exists public.hotd (
  id            uuid        primary key default gen_random_uuid(),
  signal_id     uuid        not null references public.signals(id) on delete cascade,
  publish_at    timestamptz not null,
  status        hotd_status not null default 'scheduled',
  region_scope  text        not null default 'global',
  scores        jsonb       not null default '{}',
  -- Admin notes
  curator_note  text,
  is_epoch_signal boolean   not null default false,
  created_at    timestamptz not null default now(),
  unique (publish_at::date)
);

create index if not exists hotd_publish_idx on public.hotd (publish_at desc);
create index if not exists hotd_status_idx  on public.hotd (status, publish_at);

-- ── support_events ────────────────────────────────────────────────────
create table if not exists public.support_events (
  id              uuid        primary key default gen_random_uuid(),
  stripe_event_id text        not null unique,
  amount_cents    int         not null check (amount_cents > 0),
  currency        text        not null default 'eur',
  interval        text        check (interval in ('one_time', 'monthly')),
  status          text        not null default 'succeeded',
  created_at      timestamptz not null default now()
);

-- ── anti_spam_log ─────────────────────────────────────────────────────
create table if not exists public.anti_spam_log (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        references public.users(id) on delete cascade,
  ip_hash     text,
  action      text        not null,
  signal_id   uuid        references public.signals(id) on delete set null,
  details     jsonb       not null default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists spam_log_user_idx   on public.anti_spam_log (user_id, created_at desc);
create index if not exists spam_log_action_idx on public.anti_spam_log (action, created_at desc);

-- ── Rate limits ───────────────────────────────────────────────────────
create table if not exists public.vote_rate_limits (
  user_id    uuid  not null references public.users(id) on delete cascade,
  day        date  not null default current_date,
  vote_count int   not null default 0,
  primary key (user_id, day)
);

-- ═══════════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════════

-- Update signal vote aggregates after each vote
create or replace function update_signal_vote_counts()
returns trigger language plpgsql security definer as $$
declare
  v_yes     int;  v_no  int;  v_abs int;  v_total int;
  v_yes_w   numeric; v_no_w numeric;
begin
  select
    coalesce(sum(case when choice = 'yes'    then 1 else 0 end), 0),
    coalesce(sum(case when choice = 'no'     then 1 else 0 end), 0),
    coalesce(sum(case when choice = 'abstain' then 1 else 0 end), 0),
    count(*),
    coalesce(sum(case when choice = 'yes'    then weight else 0 end), 0),
    coalesce(sum(case when choice = 'no'     then weight else 0 end), 0)
  into v_yes, v_no, v_abs, v_total, v_yes_w, v_no_w
  from public.votes
  where signal_id = coalesce(new.signal_id, old.signal_id);

  update public.signals set
    vote_count    = v_total,
    yes_count     = v_yes,
    no_count      = v_no,
    abstain_count = v_abs,
    yes_percent   = case when v_total > 0 then round((v_yes::numeric / v_total) * 100, 2) else 50 end,
    no_percent    = case when v_total > 0 then round((v_no::numeric  / v_total) * 100, 2) else 50 end,
    yes_weighted  = v_yes_w,
    no_weighted   = v_no_w,
    updated_at    = now()
  where id = coalesce(new.signal_id, old.signal_id);

  return coalesce(new, old);
end;
$$;

drop trigger if exists on_vote_change on public.votes;
create trigger on_vote_change
  after insert or update or delete on public.votes
  for each row execute function update_signal_vote_counts();

-- ═══════════════════════════════════════════════════════════════════
-- RLS POLICIES
-- ═══════════════════════════════════════════════════════════════════

alter table public.users           enable row level security;
alter table public.signals         enable row level security;
alter table public.votes           enable row level security;
alter table public.vote_nuance_tags enable row level security;
alter table public.hotd            enable row level security;
alter table public.support_events  enable row level security;
alter table public.anti_spam_log   enable row level security;
alter table public.vote_rate_limits enable row level security;

-- users: lecture publique partielle, écriture self only
create policy "users_public_read"  on public.users for select using (not is_banned);
create policy "users_self_update"  on public.users for update using (auth.uid() = id);
create policy "users_insert_self"  on public.users for insert with check (auth.uid() = id);

-- signals: lecture publique (active), écriture service_role + admin
create policy "signals_public_read" on public.signals for select
  using (status in ('active', 'resolved'));
create policy "signals_service_write" on public.signals for all
  using (auth.role() = 'service_role');
create policy "signals_admin_write" on public.signals for all
  using (exists (select 1 from public.users where id = auth.uid() and is_admin = true));

-- votes: anonymisés en lecture (pas de user_id exposé), auth required pour écriture
create policy "votes_public_read" on public.votes for select
  using (true); -- signal_id visible, user_id stays private via views if needed
create policy "votes_auth_insert" on public.votes for insert
  with check (auth.uid() = user_id);
create policy "votes_auth_update" on public.votes for update
  using (auth.uid() = user_id);

-- nuance tags: même règles que votes
create policy "nuance_public_read"  on public.vote_nuance_tags for select using (true);
create policy "nuance_auth_write"   on public.vote_nuance_tags for insert
  with check (exists (select 1 from public.votes where id = vote_id and user_id = auth.uid()));

-- hotd: lecture publique (live/done), admin write
create policy "hotd_public_read"   on public.hotd for select
  using (status in ('live', 'done'));
create policy "hotd_service_write" on public.hotd for all
  using (auth.role() = 'service_role');

-- support_events: service_role only
create policy "support_service_only" on public.support_events for all
  using (auth.role() = 'service_role');

-- anti_spam_log + rate_limits: service_role only
create policy "spam_log_service"   on public.anti_spam_log   for all using (auth.role() = 'service_role');
create policy "rate_limits_service" on public.vote_rate_limits for all using (auth.role() = 'service_role');
