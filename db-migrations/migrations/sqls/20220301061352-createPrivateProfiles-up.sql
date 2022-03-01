create table private_profiles
(
    id            uuid                     not null,
    "firstName"   text                     not null,
    "lastName"    text                     not null,
    "dateOfBirth" timestamp with time zone not null,
    "countryId"   uuid                     not null,
    "stateId"     uuid                     not null,
    "agreeToTnc"  boolean                  not null,
    "createdAt"   timestamp with time zone not null,
    "updatedAt"   timestamp with time zone not null,
    primary key (id),
    constraint fk_private_profiles_users_id foreign key (id) references auth.users (id),
    constraint fk_private_profiles_countries_id foreign key ("countryId") references countries (id),
    constraint fk_private_profiles_states_id foreign key ("stateId") references states (id)
);


alter table private_profiles
    enable row level security;


INSERT INTO private_profiles
SELECT id,
       "firstName",
       "lastName",
       "dateOfBirth",
       "countryId",
       "stateId",
       "agreeToTnc",
       "createdAt",
       "updatedAt"
FROM profiles;

alter table profiles
    drop column "firstName",
    drop column "lastName",
    drop column "dateOfBirth",
    drop column "countryId",
    drop column "stateId",
    drop column "agreeToTnc";
