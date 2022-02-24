DROP POLICY IF EXISTS authenticated_insert_posts_table on posts;
DROP POLICY IF EXISTS authenticated_insert_post_likes_table on post_likes;
DROP POLICY IF EXISTS authenticated_insert_post_comments_table on post_comments;
DROP POLICY IF EXISTS authenticated_insert_blocked_users on blocked_users;
DROP POLICY IF EXISTS authenticated_insert_user_followers on user_followers;
