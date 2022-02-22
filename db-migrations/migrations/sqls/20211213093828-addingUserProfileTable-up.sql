create table profiles
(
    id            uuid                     not null,
    username      text                     not null,
    "firstName"   text                     not null,
    "lastName"    text                     not null,
    "dateOfBirth" timestamp with time zone,
    "countryId"   uuid                     not null,
    "stateId"     uuid                     not null,
    "agreeToTnc"  boolean,
    "avatarUrl"   text,
    "createdAt"   timestamp with time zone not null,
    "updatedAt"   timestamp with time zone not null,
    primary key (id),
    unique (username),
    constraint username_length check (char_length(username) >= 3),
    constraint fk_profiles_users_id foreign key (id) references auth.users (id),
    constraint fk_profiles_countries_id foreign key ("countryId") references countries (id),
    constraint fk_profiles_states_id foreign key ("stateId") references states (id)
);

alter table profiles
    add "isPrivate" boolean default false not null;

alter table profiles
    enable row level security;

