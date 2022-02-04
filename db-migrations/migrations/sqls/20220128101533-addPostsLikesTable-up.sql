CREATE TABLE IF NOT EXISTS post_likes
(
    id          uuid                     NOT NULL DEFAULT gen_random_uuid(),
    "postId"    uuid                     NOT NULL,
    "likedBy"   uuid                     NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT post_likes_pk PRIMARY KEY (id),
    CONSTRAINT fk_post_likes_posts_id FOREIGN KEY ("postId")
        REFERENCES posts (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_post_likes_profiles_id FOREIGN KEY ("likedBy")
        REFERENCES profiles (id) MATCH SIMPLE
        ON DELETE CASCADE
);

ALTER TABLE post_likes
    ADD CONSTRAINT post_likes_post_id_liked_by_key UNIQUE ("postId", "likedBy");

alter table post_likes
    enable row level security;
