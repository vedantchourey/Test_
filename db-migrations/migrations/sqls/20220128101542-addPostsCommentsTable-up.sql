CREATE TABLE post_comments
(
    id          uuid                     NOT NULL DEFAULT gen_random_uuid(),
    comment     text                     NOT NULL,
    "commentBy" uuid                     NOT NULL,
    "postId"    uuid                     NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT post_comments_pk PRIMARY KEY (id),
    CONSTRAINT fk_post_comments_posts_id FOREIGN KEY ("postId")
        REFERENCES posts (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_post_comments_profile_id FOREIGN KEY ("commentBy")
        REFERENCES profiles (id)
        ON DELETE CASCADE
);

create
    policy authenticated_insert_post_comments_table on post_comments
    for
    insert with check
    (auth.role() = 'authenticated');