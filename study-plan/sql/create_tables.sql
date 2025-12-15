-- Run this in Supabase SQL editor
create extension if not exists "pgcrypto";

create table if not exists finals (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  test_date timestamptz not null,
  classroom text,
  created_at timestamptz default now()
);

-- Simple policy for public read/write for testing ONLY. Replace with secure policies before production.
-- enable RLS and add permissive policy for authenticated users if you want auth-based access
-- alter table finals enable row level security;
-- create policy "allow public insert" on finals for insert using (true) with check (true);
-- create policy "allow public select" on finals for select using (true);
