-- supabase/migrations/0001_create_profiles.sql
create table profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  role text not null default 'user' check (role in ('admin', 'editor', 'user')),
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- RLSの設定
alter table profiles enable row level security;

-- プロフィールの参照ポリシー
create policy "Profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- プロフィールの更新ポリシー
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );