create table user_roles
(
    id       uuid not null default gen_random_uuid(),
    "userId" uuid not null,
    code     text not null,
    constraint fk_user_roles_profiles_id foreign key ("userId") references profiles (id)
);

alter table user_roles
    enable row level security;

create policy "Users can view their own roles."
    on user_roles for select
    using (auth.uid() = "userId");
