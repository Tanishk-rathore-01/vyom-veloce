create extension if not exists "uuid-ossp";

-- Vehicles table
create table if not exists vehicles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  brand text not null,
  category text check (category in ('car', 'motorcycle')) not null,
  origin text check (origin in ('indian', 'international')) not null,
  engine text,
  price numeric not null,
  image_query text not null,
  created_at timestamp with time zone default now()
);

-- Modification requests table
create table if not exists modification_requests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text not null,
  vehicle_model text not null,
  modification_type text not null,
  budget_range text not null,
  message text,
  created_at timestamp with time zone default now()
);

-- Listing requests table
create table if not exists listing_requests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text not null,
  vehicle_details text not null,
  asking_price numeric not null,
  created_at timestamp with time zone default now()
);

-- RLS policies
alter table vehicles enable row level security;
drop policy if exists "Public can view vehicles" on vehicles;
create policy "Public can view vehicles" on vehicles for select using (true);

alter table modification_requests enable row level security;
drop policy if exists "Anyone can insert modification requests" on modification_requests;
create policy "Anyone can insert modification requests" on modification_requests
  for insert
  with check (true);

alter table listing_requests enable row level security;
drop policy if exists "Anyone can insert listing requests" on listing_requests;
create policy "Anyone can insert listing requests" on listing_requests
  for insert
  with check (true);

-- Optional admin vehicle management policies for dashboard insert/delete.
-- Replace 'admin@vyomveloce.com' with your real admin email if you want DB-level admin enforcement.
drop policy if exists "Configured admin can manage vehicles" on vehicles;
create policy "Configured admin can manage vehicles" on vehicles
  for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@vyomveloce.com')
  with check ((auth.jwt() ->> 'email') = 'admin@vyomveloce.com');

drop policy if exists "Admin can view modification requests" on modification_requests;
create policy "Admin can view modification requests" on modification_requests
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@vyomveloce.com');

drop policy if exists "Admin can view listing requests" on listing_requests;
create policy "Admin can view listing requests" on listing_requests
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@vyomveloce.com');
