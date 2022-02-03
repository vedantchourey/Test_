-- Table: public.blocked_users

-- DROP TABLE IF EXISTS public.blocked_users;

CREATE TABLE IF NOT EXISTS public.blocked_users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "blockedBy" uuid NOT NULL,
    "blockedUser" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT blocked_users_pkey PRIMARY KEY (id),
    CONSTRAINT "blocked_users_blockedBy_fkey" FOREIGN KEY ("blockedBy")
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "blocked_users_blockedUser_fkey" FOREIGN KEY ("blockedUser")
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.blocked_users
    OWNER to supabase_admin;

GRANT ALL ON TABLE public.blocked_users TO anon;

GRANT ALL ON TABLE public.blocked_users TO authenticated;

GRANT ALL ON TABLE public.blocked_users TO postgres;

GRANT ALL ON TABLE public.blocked_users TO service_role;

GRANT ALL ON TABLE public.blocked_users TO supabase_admin;