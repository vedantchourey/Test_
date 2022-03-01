alter table profiles
    add column "firstName"   text null,
    add column "lastName"    text null,
    add column "dateOfBirth" timestamp with time zone,
    add column "countryId"   uuid null,
    add column "stateId"     uuid null,
    add column "agreeToTnc"  boolean;

update profiles
set "firstName"   = private_profiles."firstName",
    "lastName"    = private_profiles."lastName",
    "dateOfBirth" = private_profiles."dateOfBirth",
    "countryId"   = private_profiles."countryId",
    "stateId"     = private_profiles."stateId",
    "agreeToTnc"  = private_profiles."agreeToTnc"
from private_profiles
where profiles.id = private_profiles.id;

alter table profiles alter column "firstName" set not null;
alter table profiles alter column "lastName" set not null;
alter table profiles alter column "dateOfBirth" set not null;
alter table profiles alter column "countryId" set not null;
alter table profiles alter column "stateId" set not null;
alter table profiles alter column "agreeToTnc" set not null;

drop table private_profiles;
