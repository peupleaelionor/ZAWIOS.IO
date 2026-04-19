-- ═══════════════════════════════════════════════════════════
-- ZAWIOS — HOTD (Hot Of the Day) + Epoch Series
-- ═══════════════════════════════════════════════════════════

-- HOTD items: one HOTD selected per day
create table if not exists hotd_items (
  id          uuid        primary key default gen_random_uuid(),
  date        date        not null unique,
  signal_id   uuid        not null references signals(id) on delete cascade,
  region_scope text       not null default 'global',
  score       int         not null default 0,
  reasons     jsonb       not null default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists hotd_items_date_idx on hotd_items (date desc);
create index if not exists hotd_items_signal_idx on hotd_items (signal_id);

-- Mini-avis: short user opinions after voting (max 240 chars)
create table if not exists signal_opinions (
  id          uuid        primary key default gen_random_uuid(),
  signal_id   uuid        not null references signals(id) on delete cascade,
  user_id     uuid        references auth.users(id) on delete set null,
  content     text        not null check (char_length(content) <= 240),
  lang        text        not null default 'fr' check (lang in ('fr', 'en')),
  helpful_count int       not null default 0,
  hidden      boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists signal_opinions_signal_idx on signal_opinions (signal_id, created_at desc);

-- Rate limiting: track per-user per-signal-per-day opinion count
create table if not exists opinion_rate_limits (
  user_id     uuid        not null,
  signal_id   uuid        not null,
  day         date        not null default current_date,
  count       int         not null default 1,
  primary key (user_id, signal_id, day)
);

-- Epoch series: 60-day thematic signal series
create table if not exists epoch_series (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  description text,
  day_index   int         not null,
  signal_id   uuid        not null references signals(id) on delete cascade,
  published_at date,
  created_at  timestamptz not null default now(),
  unique (name, day_index)
);

create index if not exists epoch_series_name_idx on epoch_series (name, day_index);

-- RLS policies
alter table hotd_items enable row level security;
create policy "hotd_public_read" on hotd_items for select using (true);
create policy "hotd_service_write" on hotd_items for all using (auth.role() = 'service_role');

alter table signal_opinions enable row level security;
create policy "opinions_public_read" on signal_opinions for select using (not hidden);
create policy "opinions_user_insert" on signal_opinions for insert with check (auth.uid() = user_id);
create policy "opinions_user_update" on signal_opinions for update using (auth.uid() = user_id);

alter table epoch_series enable row level security;
create policy "epoch_public_read" on epoch_series for select using (published_at <= current_date);
create policy "epoch_service_write" on epoch_series for all using (auth.role() = 'service_role');
