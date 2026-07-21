-- AZAZOTHX Archive — Database Schema
-- Run this in the Supabase SQL Editor.

create extension if not exists "uuid-ossp";

-- ========== ENUM TYPES ==========
create type reading_status as enum ('to_read', 'reading', 'finished', 'paused');
create type book_category as enum ('Finance', 'Investasi', 'Bisnis', 'Programming', 'Self Development');

-- ========== PROFILES ==========
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null
);

-- ========== BOOKS ==========
create table books (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  author text not null,
  category book_category not null,
  cover_url text,
  status reading_status default 'to_read' not null,
  progress smallint default 0 check (progress between 0 and 100),
  rating smallint check (rating between 1 and 5),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz default now() not null
);

-- ========== TAGS ==========
create table tags (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  unique (user_id, name)
);

create table book_tags (
  book_id uuid references books on delete cascade not null,
  tag_id uuid references tags on delete cascade not null,
  primary key (book_id, tag_id)
);

-- ========== NOTES ==========
create table book_notes (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references books on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  page_reference text,
  created_at timestamptz default now() not null
);

-- ========== TIMELINE ==========
create table timeline_entries (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references books on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  event text not null,
  created_at timestamptz default now() not null
);

-- ========== INDEXES ==========
create index books_user_id_idx on books (user_id);
create index books_category_idx on books (category);
create index book_notes_book_id_idx on book_notes (book_id);
create index timeline_user_id_idx on timeline_entries (user_id);

-- ========== ROW LEVEL SECURITY ==========
alter table profiles enable row level security;
alter table books enable row level security;
alter table tags enable row level security;
alter table book_tags enable row level security;
alter table book_notes enable row level security;
alter table timeline_entries enable row level security;

create policy "Profiles are viewable by owner" on profiles
  for select using (auth.uid() = id);
create policy "Profiles are editable by owner" on profiles
  for update using (auth.uid() = id);
create policy "Profiles are insertable by owner" on profiles
  for insert with check (auth.uid() = id);

create policy "Books are managed by owner" on books
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Tags are managed by owner" on tags
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Book tags are managed by owner" on book_tags
  for all using (
    exists (select 1 from books where books.id = book_tags.book_id and books.user_id = auth.uid())
  );

create policy "Notes are managed by owner" on book_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Timeline is managed by owner" on timeline_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ========== AUTO-CREATE PROFILE ON SIGNUP ==========
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name)
  values (new.id, split_part(new.email, '@', 1), new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
