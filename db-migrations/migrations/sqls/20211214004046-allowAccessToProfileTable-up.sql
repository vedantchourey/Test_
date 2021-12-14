create policy "Users can view their own profile."
  on profiles for select
  using ( auth.uid() = id );
