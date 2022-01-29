/* Replace with your SQL commands */

-- Table: public.post_likes

-- DROP TABLE IF EXISTS public.post_likes;

CREATE TABLE IF NOT EXISTS public.post_likes
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "postId" uuid NOT NULL,
    "likedBy" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT post_likes_pk PRIMARY KEY (id),
    CONSTRAINT fk_post_likes_posts_id FOREIGN KEY ("postId")
        REFERENCES public.posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_post_likes_profiles_id FOREIGN KEY ("likedBy")
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.post_likes
    OWNER to postgres;

GRANT ALL ON TABLE public.post_likes TO anon;

GRANT ALL ON TABLE public.post_likes TO authenticated;

GRANT ALL ON TABLE public.post_likes TO postgres;

GRANT ALL ON TABLE public.post_likes TO service_role;
-- Index: post_likes_id_uindex

-- DROP INDEX IF EXISTS public.post_likes_id_uindex;

CREATE UNIQUE INDEX IF NOT EXISTS post_likes_id_uindex
    ON public.post_likes USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;