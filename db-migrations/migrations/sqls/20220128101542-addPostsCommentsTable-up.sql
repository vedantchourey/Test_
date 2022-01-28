/* Replace with your SQL commands */

-- Table: public.post_comments

-- DROP TABLE IF EXISTS public.post_comments;

CREATE TABLE IF NOT EXISTS public.post_comments
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    comment text COLLATE pg_catalog."default" NOT NULL,
    "commentBy" uuid NOT NULL,
    "postId" uuid NOT NULL,
    CONSTRAINT post_comments_pk PRIMARY KEY (id),
    CONSTRAINT fk_post_comments_posts_id FOREIGN KEY ("postId")
        REFERENCES public.posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_post_comments_profile_id FOREIGN KEY ("commentBy")
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.post_comments
    OWNER to postgres;

GRANT ALL ON TABLE public.post_comments TO anon;

GRANT ALL ON TABLE public.post_comments TO authenticated;

GRANT ALL ON TABLE public.post_comments TO postgres;

GRANT ALL ON TABLE public.post_comments TO service_role;
-- Index: post_comments_id_uindex

-- DROP INDEX IF EXISTS public.post_comments_id_uindex;

CREATE UNIQUE INDEX IF NOT EXISTS post_comments_id_uindex
    ON public.post_comments USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;