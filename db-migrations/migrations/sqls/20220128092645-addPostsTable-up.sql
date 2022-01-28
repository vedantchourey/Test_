/* Replace with your SQL commands */

-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "postContent" text COLLATE pg_catalog."default" NOT NULL,
    "postImgUrl" text COLLATE pg_catalog."default" NOT NULL,
    "postedBy" uuid NOT NULL,
    CONSTRAINT fk_posts_profiles_id FOREIGN KEY ("postedBy")
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

GRANT ALL ON TABLE public.posts TO anon;

GRANT ALL ON TABLE public.posts TO authenticated;

GRANT ALL ON TABLE public.posts TO postgres;

GRANT ALL ON TABLE public.posts TO service_role;
-- Index: posts_id_uindex

-- DROP INDEX IF EXISTS public.posts_id_uindex;

CREATE UNIQUE INDEX IF NOT EXISTS posts_id_uindex
    ON public.posts USING btree
    (id ASC NULLS LAST, id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: posts_id_uindex_2

-- DROP INDEX IF EXISTS public.posts_id_uindex_2;

CREATE UNIQUE INDEX IF NOT EXISTS posts_id_uindex_2
    ON public.posts USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;