CREATE TABLE blocked_users
(
    id            uuid NOT NULL            DEFAULT gen_random_uuid(),
    "blockedBy"   uuid NOT NULL,
    "blockedUser" uuid NOT NULL,
    "createdAt"   timestamp with time zone DEFAULT now(),
    CONSTRAINT blocked_users_pkey PRIMARY KEY (id),
    CONSTRAINT fk_blocked_users_blocked_by_profiles FOREIGN KEY ("blockedBy")
        REFERENCES profiles (id),
    CONSTRAINT fk_blocked_users_blocked_user_profiles FOREIGN KEY ("blockedUser")
        REFERENCES profiles (id)
);

ALTER TABLE blocked_users
    ADD CONSTRAINT blocked_users_blocked_by_blocked_user UNIQUE ("blockedBy", "blockedUser");

alter table blocked_users
    enable row level security;
