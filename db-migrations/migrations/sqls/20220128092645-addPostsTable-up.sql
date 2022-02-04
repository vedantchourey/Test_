CREATE TABLE posts
(
    id            uuid                     NOT NULL DEFAULT gen_random_uuid(),
    "postContent" text                     NOT NULL,
    "postImgUrl"  text                     NOT NULL,
    "postedBy"    uuid                     NOT NULL,
    "createdAt"   timestamp with time zone NOT NULL DEFAULT now(),
    "updatedAt"   timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT posts_pk PRIMARY KEY (id),
    CONSTRAINT fk_posts_profiles_id FOREIGN KEY ("postedBy")
        REFERENCES profiles (id)
);

alter table posts
    enable row level security;
