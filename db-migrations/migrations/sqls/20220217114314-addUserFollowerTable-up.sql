CREATE TABLE user_followers 
(
  id            uuid NOT NULL            DEFAULT gen_random_uuid(),
  "followerId"  uuid not null ,
  "userId"      uuid not null ,
  "followedAt" timestamp with time zone default now() not null,
  CONSTRAINT user_followers_pk Primary Key (id),
  CONSTRAINT fk_user_followers_followerId_profiles_id FOREIGN KEY ("followerId") REFERENCES profiles (id),
  CONSTRAINT fk_user_followers_userId_profiles_id FOREIGN KEY ("userId") REFERENCES profiles (id)
);

alter table
  user_followers enable row level security;

create
    policy authenticated_read_user_followers on user_followers
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_insert_user_followers on user_followers
    for
    insert with check
    (auth.role() = 'authenticated');