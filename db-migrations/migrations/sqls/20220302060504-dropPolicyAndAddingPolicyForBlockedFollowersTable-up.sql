DROP POLICY IF EXISTS authenticated_read_blocked_users on blocked_users;
DROP POLICY IF EXISTS authenticated_read_user_followers on user_followers;

create policy
    authenticated_read_user_followers on user_followers  for
    select
    using (auth.role() = 'authenticated');

create policy
    authenticated_read_blocked_users on blocked_users  for
    select
    using (auth.role() = 'authenticated');