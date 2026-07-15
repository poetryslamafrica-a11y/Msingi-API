-- ═══════════════════════════════════════════════════════════
-- MSINGI — CORE SCHEMA
-- The Alkebulan Poetry Institute
-- ═══════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ── ENUMS ──────────────────────────────────────────────────

create type member_rank as enum (
  'guest', 'applicant', 'member', 'apprentice',
  'practitioner', 'professional', 'associate_fellow', 'fellow'
);

create type user_type as enum (
  'member', 'faculty', 'mentor', 'assessor',
  'administrator', 'partner', 'sponsor', 'employer', 'researcher'
);

create type application_status as enum (
  'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'
);

create type module_content_type as enum (
  'video', 'reading', 'audio', 'performance', 'quiz',
  'writing_exercise', 'peer_review', 'capstone'
);

-- ── PROFILES (extends Supabase auth.users) ────────────────

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  display_name text,
  headline text,                          -- e.g. "Spoken Word Poet · Nairobi"
  bio text,
  artist_statement text,
  avatar_url text,
  cover_image_url text,

  country text,
  city text,
  languages text[] default '{}',          -- languages spoken/written in
  pronouns text,

  rank member_rank not null default 'guest',
  user_types user_type[] default '{member}',

  is_verified boolean not null default false,
  verified_at timestamptz,

  website_url text,
  social_links jsonb default '{}'::jsonb, -- {instagram, x, youtube, tiktok, ...}

  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Professional profile — LinkedIn x Behance model, not a "student" record.';

-- ── APPLICATIONS (onboarding / admission) ─────────────────

create table public.applications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,

  pathway text not null,                  -- 'young_voices' | 'rising_voices' | 'emerging_pro' | 'professional_dev' | 'master_practitioner'
  country text not null,
  primary_language text not null,
  experience_level text,                  -- self-reported
  goals text[],
  interests text[],

  rpl_claimed boolean not null default false,
  rpl_evidence jsonb default '[]'::jsonb, -- array of {type, description, file_url}

  portfolio_upload_urls text[] default '{}',
  ai_assessment_summary text,             -- output of AI skills assessment
  suggested_learning_plan jsonb,          -- generated plan (schools/modules)

  status application_status not null default 'draft',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  review_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── SCHOOLS / PROGRAMMES / MODULES / LESSONS ──────────────

create table public.schools (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,              -- e.g. 'MsI-101'
  name text not null,                     -- e.g. 'School of Craft'
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.programmes (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid not null references public.schools(id) on delete cascade,
  code text unique not null,              -- e.g. 'MsI-101-P1'
  title text not null,
  description text,
  capstone_required boolean not null default true,
  credential_name text,                   -- e.g. 'Certificate in African Poetry Writing'
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.modules (
  id uuid primary key default uuid_generate_v4(),
  programme_id uuid not null references public.programmes(id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  content_type module_content_type not null,
  body_md text,                           -- interactive reading content
  video_url text,                         -- Mux/Cloudflare Stream asset
  audio_url text,
  downloads jsonb default '[]'::jsonb,    -- [{label, url}]
  estimated_minutes int,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── PROGRESS / COMPLETION / BADGES ─────────────────────────

create table public.enrollments (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  programme_id uuid not null references public.programmes(id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  progress_pct numeric(5,2) not null default 0,
  unique (profile_id, programme_id)
);

create table public.lesson_progress (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed_at timestamptz,
  submission jsonb,                        -- writing exercise / quiz answers / peer review text
  ai_feedback text,                        -- AI tutor critique, if requested
  unique (profile_id, lesson_id)
);

create table public.credentials (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  programme_id uuid references public.programmes(id),
  title text not null,                    -- e.g. 'Certificate in African Poetry Writing'
  issued_at timestamptz not null default now(),
  credential_url text,                    -- shareable/verifiable public URL
  blockchain_hash text,                   -- optional tamper-proof anchor
  metadata jsonb default '{}'::jsonb
);

create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  icon_url text
);

create table public.profile_badges (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  primary key (profile_id, badge_id)
);

-- ── PORTFOLIO ──────────────────────────────────────────────

create table public.portfolio_items (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  item_type text not null,                -- 'poem' | 'video' | 'audio' | 'article' | 'publication' | 'research'
  title text not null,
  description text,
  content_md text,                        -- for text-based items (poems, articles)
  media_url text,                         -- for video/audio
  external_url text,                      -- e.g. link to journal publication
  language text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── COMMUNITY ──────────────────────────────────────────────

create table public.chapters (
  id uuid primary key default uuid_generate_v4(),
  type text not null,                     -- 'country' | 'language' | 'guild'
  name text not null,                     -- e.g. 'Kenya Chapter', 'Swahili Guild'
  slug text unique not null,
  country text,
  language text,
  lead_profile_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.chapter_members (
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (chapter_id, profile_id)
);

create table public.mentorships (
  id uuid primary key default uuid_generate_v4(),
  mentor_id uuid not null references public.profiles(id),
  mentee_id uuid not null references public.profiles(id),
  status text not null default 'active', -- 'active' | 'completed' | 'ended'
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  notes text
);

-- ── CAREER CENTER / MARKETPLACE ────────────────────────────

create table public.opportunities (
  id uuid primary key default uuid_generate_v4(),
  posted_by uuid references public.profiles(id),
  type text not null,          -- 'job'|'festival'|'residency'|'grant'|'competition'|'publishing_call'|'teaching'|'research'|'internship'
  title text not null,
  organisation text,
  description text,
  location text,
  is_remote boolean default false,
  compensation text,
  application_url text,
  deadline date,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.marketplace_listings (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,      -- 'coaching'|'editing'|'performance'|'translation'|'audio_production'|'video_production'|'design'
  title text not null,
  description text,
  price_amount numeric(10,2),
  price_currency text default 'USD',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── RIGHTS MANAGEMENT ──────────────────────────────────────

create table public.rights_requests (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  request_type text not null,  -- 'copyright_registration'|'isbn'|'licensing'|'royalty_collection'|'cmo_integration'
  work_title text not null,
  status text not null default 'submitted', -- 'submitted'|'in_progress'|'completed'|'rejected'
  external_reference text,     -- e.g. CMO case number
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.rights_requests enable row level security;
alter table public.marketplace_listings enable row level security;

-- Profiles: public read of public fields, owner write
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users manage their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Applications: owner-only
create policy "Users manage their own applications"
  on public.applications for all using (auth.uid() = profile_id);

-- Enrollments / progress: owner-only
create policy "Users manage their own enrollments"
  on public.enrollments for all using (auth.uid() = profile_id);

create policy "Users manage their own lesson progress"
  on public.lesson_progress for all using (auth.uid() = profile_id);

-- Portfolio: public read if is_public, owner write
create policy "Public portfolio items are readable"
  on public.portfolio_items for select using (is_public = true or auth.uid() = profile_id);

create policy "Users manage their own portfolio"
  on public.portfolio_items for insert with check (auth.uid() = profile_id);

create policy "Users update their own portfolio"
  on public.portfolio_items for update using (auth.uid() = profile_id);

-- Rights requests: owner-only
create policy "Users manage their own rights requests"
  on public.rights_requests for all using (auth.uid() = profile_id);

-- Marketplace: public read of active listings, owner write
create policy "Active marketplace listings are public"
  on public.marketplace_listings for select using (is_active = true or auth.uid() = profile_id);

create policy "Users manage their own listings"
  on public.marketplace_listings for insert with check (auth.uid() = profile_id);

create policy "Users update their own listings"
  on public.marketplace_listings for update using (auth.uid() = profile_id);

-- ── SEED: SCHOOLS ──────────────────────────────────────────

insert into public.schools (code, name, description, sort_order) values
  ('MsI-1', 'School of Craft', 'Foundations of African Poetry. Form, voice, tradition.', 1),
  ('MsI-2', 'School of Performance', 'Spoken word delivery, slam competition, stage presence.', 2),
  ('MsI-3', 'School of Publishing', 'Manuscript development, ISBN, distribution, editing.', 3),
  ('MsI-4', 'School of Rights', 'Copyright, licensing, royalty collection, CMOs.', 4),
  ('MsI-5', 'School of Business', 'Grant writing, pricing your work, creative entrepreneurship.', 5),
  ('MsI-6', 'School of Media', 'Video, audio production, digital presence, EPKs.', 6),
  ('MsI-7', 'School of Teaching', 'Facilitation, workshop design, mentorship practice.', 7),
  ('MsI-8', 'School of Translation', 'Multilingual poetry, translation ethics and craft.', 8),
  ('MsI-9', 'School of Research', 'Poetry scholarship, archiving, oral history methods.', 9),
  ('MsI-10', 'School of Leadership', 'Festival direction, institutional and cultural leadership.', 10);
