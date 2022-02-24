create
    policy authenticated_read_posts on posts
    for
    select
    using (auth.role() = 'authenticated');


create
    policy authenticated_read_post_comments on post_comments
    for
    select
    using (auth.role() = 'authenticated');


create
    policy authenticated_read_post_likes on post_likes
    for
    select
    using (auth.role() = 'authenticated');


create
    policy authenticated_read_blocked_users on blocked_users
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_user_followers on user_followers
    for
    select
    using (auth.role() = 'authenticated');