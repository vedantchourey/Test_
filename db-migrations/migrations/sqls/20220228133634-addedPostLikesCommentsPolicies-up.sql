alter table posts
    enable row level security;

create
    policy authenticated_read_posts_table on posts
    for
    select
    using (auth.role() = 'authenticated');

alter table post_likes
    enable row level security;

create 
    policy authenticated_read_post_likes_table on post_likes
    for
    select
    using (auth.role() = 'authenticated');


alter table post_comments
    enable row level security;

create 
    policy authenticated_read_post_comments_table on post_comments
    for
    select
    using (auth.role() = 'authenticated');