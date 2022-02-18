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

alter table blocked_users
    enable row level security;

create
    policy authenticated_read_blocked_users on blocked_users
    for
    select
    using (auth.role() = 'authenticated');

create 
    policy authenticated_insert_blocked_users on blocked_users
    for
    insert with check
    (auth.role() = 'authenticated');