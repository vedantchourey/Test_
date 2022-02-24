create
    policy authenticated_read_posts on posts
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_insert_posts on posts
    for insert
    with check (auth.role() = 'authenticated');

create
    policy authenticated_update_posts on posts
    for
    update
    using (auth.role() = 'authenticated');

create
    policy authenticated_delete_posts on posts
    for
    delete
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_post_comments on post_comments
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_insert_post_comments on post_comments
    for insert
    with check (auth.role() = 'authenticated');

create
    policy authenticated_update_post_comments on post_comments
    for
    update
    using (auth.role() = 'authenticated');

create
    policy authenticated_delete_post_comments on post_comments
    for
    delete
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_post_likes on post_likes
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_delete_post_likes on post_likes
    for
    delete
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_blocked_users on blocked_users
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_insert_blocked_users on blocked_users
    for insert
    with check (auth.role() = 'authenticated');

create
    policy authenticated_delete_blocked_users on blocked_users
    for
    delete
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_user_followers on user_followers
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_insert_user_followers on user_followers
    for insert
    with check (auth.role() = 'authenticated');

create
    policy authenticated_delete_user_followers on user_followers
    for
    delete
    using (auth.role() = 'authenticated');

create 
    policy auhtenticated_read_profiles on profiles
    for
    select
    using (auth.role() = 'authenticated');