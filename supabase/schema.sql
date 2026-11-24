-- Supabase > SQL Editor. Create your 2 users in Authentication > Users FIRST, then run all of this.
create table public.profiles (id uuid primary key references auth.users on delete cascade, display_name text not null);
create table public.settings (key text primary key, value text);
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  path text not null, caption text, taken_on date,
  category text not null default 'Random',
  created_by uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now());
create index on public.photos (taken_on desc);

-- Only the two people in "profiles" count as members
create function public.is_member() returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid()) $$;

alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.photos enable row level security;

create policy "members read profiles" on public.profiles for select to authenticated using (public.is_member());
create policy "members read settings" on public.settings for select to authenticated using (public.is_member());
create policy "members edit settings" on public.settings for all to authenticated using (public.is_member()) with check (public.is_member());
create policy "members read photos" on public.photos for select to authenticated using (public.is_member());
create policy "members add own photos" on public.photos for insert to authenticated with check (public.is_member() and created_by = auth.uid());
create policy "delete own photos" on public.photos for delete to authenticated using (created_by = auth.uid());

-- Private photo bucket (files live in a folder named after the uploader's user id)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "members read photo files" on storage.objects for select to authenticated
  using (bucket_id = 'photos' and public.is_member());
create policy "members upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'photos' and public.is_member() and (storage.foldername(name))[1] = auth.uid()::text);
create policy "delete own files" on storage.objects for delete to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- Used later by the keep-alive GitHub Action
create function public.ping() returns int language sql security definer set search_path = public as $$ select 1 $$;
grant execute on function public.ping() to anon, authenticated;

-- Last step: register the two users you created as members
insert into public.profiles (id, display_name) select id, split_part(email, '@', 1) from auth.users;
