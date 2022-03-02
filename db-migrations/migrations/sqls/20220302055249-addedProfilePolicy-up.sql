create policy
    authenticated_user_read_access_profile_table on profiles  for
    select
    using (auth.role() = 'authenticated');
     
