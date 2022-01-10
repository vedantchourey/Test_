create table games
(
    id            uuid not null default gen_random_uuid(),
    "displayName" text not null,
    code          text not null,
    constraint pk_games primary key (id)
);

create unique index ix_games_name on games ("displayName");
create unique index ix_games_code on games (code);

alter table games
    enable row level security;
create
    policy anon_read_games on games
    for
    select
    using (auth.role() = 'anon');

create table platforms
(
    id            uuid not null default gen_random_uuid(),
    "displayName" text not null,
    code          text not null,
    constraint pk_platforms primary key (id)
);

create unique index ix_platforms_code on platforms (code);
create unique index ix_platforms_display_name on platforms ("displayName");

alter table platforms
    enable row level security;
create
    policy anon_read_platforms on platforms
    for
    select
    using (auth.role() = 'anon');

create table game_platforms
(
    "gameId"     uuid not null,
    "platformId" uuid not null,
    constraint pk_game_platform primary key ("gameId", "platformId"),
    constraint fk_game_platform_games_id foreign key ("gameId") references games (id) on delete cascade,
    constraint fk_game_platform_platforms_id foreign key ("platformId") references platforms (id) on delete cascade
);

create index ix_game_platform_platforms_id on game_platforms ("platformId");

alter table game_platforms
    enable row level security;
create
    policy anon_read_game_platforms on game_platforms
    for
    select
    using (auth.role() = 'anon');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'FIFA 22', 'FIFA_22');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'CS:GO 2', 'CSG_O2');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'CALL OF DUTY', 'CALL_OF_DUTY');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'PUBG', 'PUBG');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'F1 2021', 'F1_2021');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'VALORANT', 'VALORANT');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'OVERWATCH', 'OVERWATCH');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'DOTA 2', 'DOTA_2');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'MORTAL KOMBAT X', 'MORTAL_KOMBAT_X');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'FORTNITE', 'FORTNITE');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'APEX LEGENDS', 'APEX_LEGENDS');

INSERT INTO games (id, "displayName", code)
VALUES (gen_random_uuid(), 'ROCKET LEAGUE', 'ROCKET_LEAGUE');

INSERT INTO platforms (id, "displayName", code)
VALUES (gen_random_uuid(), 'PS5', 'PS5');

INSERT INTO platforms (id, "displayName", code)
VALUES (gen_random_uuid(), 'PC', 'PC');

INSERT INTO platforms (id, "displayName", code)
VALUES (gen_random_uuid(), 'PS4', 'PS4');

INSERT INTO platforms (id, "displayName", code)
VALUES (gen_random_uuid(), 'Mobile', 'MOBILE');

INSERT INTO platforms (id, "displayName", code)
VALUES (gen_random_uuid(), 'XBOX', 'XBOX');

create table game_maps
(
    id            uuid not null default gen_random_uuid(),
    "gameId"      uuid not null,
    "displayName" text not null,
    code          text not null,
    constraint pk_game_maps primary key (id),
    constraint fk_game_maps_games_id foreign key ("gameId") references games (id) on delete cascade
);

create unique index ix_game_maps_code on game_maps (code);
create unique index ix_game_maps_display_name on game_maps ("displayName");
create index ix_game_maps_game_id on game_maps ("gameId");

alter table game_maps
    enable row level security;
create
    policy anon_read_game_maps on game_maps
    for
    select
    using (auth.role() = 'anon');

create table match_best_ofs
(
    id               uuid    not null default gen_random_uuid(),
    "displayName"    text    not null,
    code             text    not null,
    "numberOfRounds" integer not null,
    constraint pk_match_best_ofs primary key (id)
);

create unique index ix_match_best_ofs_code on match_best_ofs (code);
create unique index ix_match_best_ofs_display_name on match_best_ofs ("displayName");

alter table match_best_ofs
    enable row level security;
create
    policy anon_read_match_best_ofs on match_best_ofs
    for
    select
    using (auth.role() = 'anon');

create table match_formats
(
    id                 uuid    not null default gen_random_uuid(),
    "displayName"      text    not null,
    code               text    not null,
    "peopleInEachTeam" integer not null,
    constraint pk_match_formats primary key (id)
);

create unique index ix_match_formats_code on match_formats (code);
create unique index ix_match_formats_display_name on match_formats ("displayName");
create index ix_match_formats_people_in_each_team on match_formats ("peopleInEachTeam");

alter table match_formats
    enable row level security;
create
    policy anon_read_match_formats on match_formats
    for
    select
    using (auth.role() = 'anon');

create table game_match_best_ofs
(
    "bestOfsId" uuid not null,
    "gameId"    uuid not null,
    constraint pk_game_match_best_of primary key ("bestOfsId", "gameId"),
    constraint fk_game_match_best_of_games_id foreign key ("gameId") references games (id) on delete cascade,
    constraint fk_game_match_best_of_match_best_ofs_id foreign key ("bestOfsId") references match_best_ofs (id) on delete cascade
);

create index ix_game_match_best_of_game_id on game_match_best_ofs ("gameId");

alter table game_match_best_ofs
    enable row level security;
create
    policy anon_read_game_match_best_of on game_match_best_ofs
    for
    select
    using (auth.role() = 'anon');

create table game_match_formats
(
    "formatId" uuid not null,
    "gameId"   uuid not null,
    constraint pk_game_match_format primary key ("formatId", "gameId"),
    constraint fk_game_match_format_games_id foreign key ("gameId") references games (id) on delete cascade,
    constraint fk_game_match_format_match_formats_id foreign key ("formatId") references match_formats (id) on delete cascade
);

create index ix_game_match_format_game_id on game_match_formats ("gameId");

alter table game_match_formats
    enable row level security;
create
    policy anon_read_game_match_format on game_match_formats
    for
    select
    using (auth.role() = 'anon');


INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 1', 'BEST_OF_1', 1);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 2', 'BEST_OF_2', 2);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 3', 'BEST_OF_3', 3);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 4', 'BEST_OF_4', 4);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 5', 'BEST_OF_5', 5);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 6', 'BEST_OF_6', 6);

INSERT INTO match_best_ofs (id, "displayName", code, "numberOfRounds")
VALUES (gen_random_uuid(), 'Best of 30', 'BEST_OF_30', 30);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '1v1', '1v1', 1);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '2v2', '2v2', 2);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '3v3', '3v3', 3);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '4v4', '4v4', 4);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '5v5', '5v5', 5);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '6v6', '6v6', 6);

INSERT INTO match_formats (id, "displayName", code, "peopleInEachTeam")
VALUES (gen_random_uuid(), '11v11', '11v11', 11);

create table tournaments
(
    id                     uuid                        not null default gen_random_uuid(),
    "tournamentName"       text                        not null,
    "gameId"               uuid                        not null,
    "platformId"           uuid                        not null,
    "bestOfId"             uuid                        not null,
    "mapId"                uuid                        NULL,
    "formatId"             uuid                        not null,
    "scheduleDate"         timestamp without time zone not null,
    rules                  text                        not null,
    "isTeamParticipating"  boolean                     not null,
    "numberOfParticipants" int                         not null,
    "tournamentType"       text                        not null,
    "isOpenToPublic"       boolean                     not null DEFAULT FALSE,
    constraint pk_tournaments primary key (id),
    constraint fk_tournaments_game_maps_id foreign key ("mapId") references game_maps (id) on DELETE RESTRICT,
    constraint fk_tournaments_games_id foreign key ("gameId") references games (id) on DELETE RESTRICT,
    constraint fk_tournaments_match_best_ofs_id foreign key ("bestOfId") references match_best_ofs (id) on DELETE RESTRICT,
    constraint fk_tournaments_match_formats_id foreign key ("formatId") references match_formats (id) on DELETE RESTRICT,
    constraint fk_tournaments_platforms_id foreign key ("platformId") references platforms (id) on DELETE RESTRICT
);

create index ix_tournaments_best_of_id on tournaments ("bestOfId");
create index ix_tournaments_format_id on tournaments ("formatId");
create index ix_tournaments_game_id on tournaments ("gameId");
create index ix_tournaments_map_id on tournaments ("mapId");
create index ix_tournaments_platform_id on tournaments ("platformId");

alter table tournaments
    enable row level security;
create
    policy anon_read_tournaments on tournaments
    for
    select
    using (auth.role() = 'anon');


create table countries
(
    id            uuid not null default gen_random_uuid(),
    "isoCode"     text not null,
    "displayName" text not null,
    constraint pk_countries primary key (id)
);

create unique index ix_countries_display_name on countries ("displayName");
create unique index ix_countries_iso_code on countries ("isoCode");

alter table countries
    enable row level security;
create
    policy anon_read_countries on countries
    for
    select
    using (auth.role() = 'anon');

create table states
(
    id            uuid not null default gen_random_uuid(),
    "isoCode"     text not null,
    "displayName" text not null,
    "countryId"   uuid not null,
    constraint pk_states primary key (id),
    constraint fk_states_countries_id foreign key ("countryId") references countries (id) on delete cascade
);

create index ix_states_country_id on states ("countryId");
create unique index ix_states_iso_code on states ("isoCode");

alter table states
    enable row level security;
create
    policy anon_read_states on states
    for
    select
    using (auth.role() = 'anon');


INSERT INTO countries (id, "isoCode", "displayName")
VALUES (gen_random_uuid(), 'IND', 'India');

INSERT INTO states (id, "isoCode", "displayName", "countryId")
VALUES (gen_random_uuid(), 'IN-AP', 'Andhra Pradesh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-AR', 'Arunachal Pradesh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-AS', 'Assam', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-BR', 'Bihar', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-CT', 'Chhattisgarh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-GA', 'Goa', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-GJ', 'Gujarat', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-HR', 'Haryana', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-HP', 'Himachal Pradesh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-JH', 'Jharkhand', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-KA', 'Karnataka', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-KL', 'Kerala', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-MP', 'Madhya Pradesh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-MH', 'Maharashtra', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-MN', 'Manipur', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-ML', 'Meghalaya', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-MZ', 'Mizoram', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-NL', 'Nagaland', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-OR', 'Odisha', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-PB', 'Punjab', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-RJ', 'Rajasthan', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-SK', 'Sikkim', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-TN', 'Tamil Nadu', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-TG', 'Telangana', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-TR', 'Tripura', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-UT', 'Uttarakhand', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-UP', 'Uttar Pradesh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-WB', 'West Bengal', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-AN', 'Andaman and Nicobar Islands', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-CH', 'Chandigarh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-DH', 'Dadra and Nagar Haveli and Daman and Diu', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-DL', 'Delhi', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-JK', 'Jammu and Kashmir', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-LA', 'Ladakh', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-LD', 'Lakshadweep', (SELECT id from countries WHERE countries."isoCode" = 'IND')),
       (gen_random_uuid(), 'IN-PY', 'Puducherry (Pondicherry)', (SELECT id from countries WHERE countries."isoCode" = 'IND'));
