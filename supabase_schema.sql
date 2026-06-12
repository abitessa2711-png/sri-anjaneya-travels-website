-- SQL Schema Setup for Sri Anjaneya Tours & Travels database
-- Target: Supabase (PostgreSQL)

create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. PUBLIC TABLES CONFIGURATION
-- ==========================================

-- User Profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone_number text,
  is_admin boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cars Catalog
create table if not exists public.cars (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text,
  seating_capacity integer not null,
  ac_non_ac boolean default true not null,
  fuel_type text not null,
  transmission text not null,
  self_drive boolean default true not null,
  taxi_service boolean default true not null,
  price_per_day numeric not null,
  is_available boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookies reservations
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  booking_id text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  mobile_number text not null,
  email text,
  pickup_location text not null,
  drop_location text not null,
  trip_type text not null,
  vehicle_id uuid references public.cars(id) on delete set null,
  pickup_date date not null,
  pickup_time time without time zone not null,
  return_date date,
  passenger_count integer default 1 not null,
  special_instructions text,
  id_proof_url text,
  payment_option text,
  status text not null check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customer Reviews
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  approved boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Media Gallery Catalog
create table if not exists public.gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  title text not null,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 2. AUTOMATIC PROFILE TRIGGER
-- ==========================================

-- Trigger function to automatically create a profile record when a new user registers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone_number, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Customer'),
    coalesce(new.raw_user_meta_data->>'phone_number', new.phone),
    coalesce((new.raw_user_meta_data->>'is_admin')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Bind the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.gallery enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins can manage all profiles" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Cars Policies
create policy "Cars are publicly viewable" on public.cars
  for select using (true);

create policy "Only admins can manage cars" on public.cars
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Bookings Policies
create policy "Users can view own bookings" on public.bookings
  for select using (auth.uid() = user_id);

create policy "Anyone can create bookings" on public.bookings
  for insert with check (true);

create policy "Users can update own bookings" on public.bookings
  for update using (auth.uid() = user_id);

create policy "Admins can manage all bookings" on public.bookings
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Reviews Policies
create policy "Approved reviews are publicly viewable" on public.reviews
  for select using (approved = true);

create policy "Admins can view all reviews" on public.reviews
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Users can create reviews" on public.reviews
  for insert with check (true);

create policy "Admins can manage all reviews" on public.reviews
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Gallery Policies
create policy "Gallery items are publicly viewable" on public.gallery
  for select using (true);

create policy "Only admins can manage gallery" on public.gallery
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ==========================================
-- 4. STORAGE BUCKETS SETUP
-- ==========================================

-- Register Buckets
insert into storage.buckets (id, name, public) 
values ('cars-bucket', 'cars-bucket', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('gallery-bucket', 'gallery-bucket', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('id-proofs-bucket', 'id-proofs-bucket', false)
on conflict (id) do nothing;

-- Storage Security Policies on storage.objects
create policy "Cars are publicly accessible" on storage.objects
  for select using (bucket_id = 'cars-bucket');

create policy "Gallery items are publicly accessible" on storage.objects
  for select using (bucket_id = 'gallery-bucket');

create policy "Only admins can upload car files" on storage.objects
  for all using (
    bucket_id = 'cars-bucket' and 
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Only admins can upload gallery files" on storage.objects
  for all using (
    bucket_id = 'gallery-bucket' and 
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Anyone can upload ID proofs" on storage.objects
  for insert with check (bucket_id = 'id-proofs-bucket');

create policy "Users can view own ID proof" on storage.objects
  for select using (
    bucket_id = 'id-proofs-bucket' and 
    (
      (auth.uid() is not null and (storage.foldername(name))[1] = auth.uid()::text) or 
      exists (
        select 1 from public.profiles
        where id = auth.uid() and is_admin = true
      )
    )
  );

-- ==========================================
-- 5. INITIAL INVENTORY SEED DATA
-- ==========================================

-- Populate Cars
insert into public.cars (id, name, image_url, seating_capacity, ac_non_ac, fuel_type, transmission, self_drive, taxi_service, price_per_day, is_available)
values 
  ('c1000000-0000-0000-0000-000000000001', 'Toyota Innova Crysta', '/assets/cars/innova_crysta.png', 7, true, 'Diesel', 'Manual', true, true, 2500, true),
  ('c2000000-0000-0000-0000-000000000002', 'Maruti Baleno', '/assets/cars/baleno.png', 5, true, 'Petrol', 'Manual', true, true, 2000, true),
  ('c3000000-0000-0000-0000-000000000003', 'Maruti Swift Dzire', '/assets/cars/swift_dzire.png', 5, true, 'Petrol', 'Manual', true, true, 2000, true),
  ('c4000000-0000-0000-0000-000000000004', 'Hyundai Aura', '/assets/cars/hyundai_aura.png', 5, true, 'Petrol', 'Manual', true, true, 2000, true)
on conflict (id) do nothing;

-- Populate Gallery
insert into public.gallery (id, image_url, title, category)
values 
  ('a1000000-0000-0000-0000-000000000001', '/assets/flyer_1.jpg', 'Business Class Fleet Banner', 'Events'),
  ('a2000000-0000-0000-0000-000000000002', '/assets/flyer_2.jpg', 'Self Driving Car Services', 'Events'),
  ('a3000000-0000-0000-0000-000000000003', '/assets/cars/innova_crysta.png', 'Toyota Innova Crysta ready for highway rental', 'Vehicles'),
  ('a4000000-0000-0000-0000-000000000004', '/assets/cars/baleno.png', 'Premium Hatchback Fleet', 'Vehicles')
on conflict (id) do nothing;

-- Populate Reviews
insert into public.reviews (id, name, rating, comment, approved)
values 
  ('b1000000-0000-0000-0000-000000000001', 'Ramesh Kumar', 5, 'Highly recommend Sri Anjaneya travels! The Toyota Innova was in pristine condition, clean and drove smoothly. Very professional customer service.', true),
  ('b2000000-0000-0000-0000-000000000002', 'Suresh Raina', 4, 'Booked Swift Dzire for outstation trip. The driver was polite and punctual. Clean vehicle and reasonable prices. Will use again.', true),
  ('b3000000-0000-0000-0000-000000000003', 'Meera Krishnan', 5, 'Great experience with self-driving Baleno rental. Simple booking process and quick document verification. Extremely trustworthy.', true)
on conflict (id) do nothing;

