create
    policy authenticated_read_games on games
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_platforms on platforms
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_game_platforms on game_platforms
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_game_maps on game_maps
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_match_best_ofs on match_best_ofs
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_match_formats on match_formats
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_game_match_best_of on game_match_best_ofs
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_game_match_format on game_match_formats
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_tournaments on tournaments
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_countries on countries
    for
    select
    using (auth.role() = 'authenticated');

create
    policy authenticated_read_states on states
    for
    select
    using (auth.role() = 'authenticated');


