import { configureStore } from '@reduxjs/toolkit';
import gamesSliceReducer from './games/GamesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import layoutSliceReducer from './layout/LayoutSlice';
import gameAdminScreenSliceReducer from './screens/game-admin-screen/GameAdminScreenSlice';
import platformSliceReducer from './platforms/PlatformsSlice';
import matchBestOfSliceReducer from './match-best-of/MatchBestOfsSlice';
import matchFormatSliceReducer from './match-format/MatchFormatsSlice';
import tournamentAdminListScreenSliceReducer from './screens/tournaments-admin-list-screen/TournamentAdminListScreenSlice';
import homeScreenSliceReducer from './screens/home-screen/HomeScreenSlice';
import authenticationSliceReducer from './authentication/AuthenticationSlice';
import countrySliceReducer from './countries/CountrySlice';
import screenAnimationsSliceReducer from './screen-animations/ScreenAnimationSlice';
import tournamentDetailsScreenSliceReducer from './screens/tournament-details-screen/TournamentDetailsScreenSlice';

const store = configureStore({
  reducer: {
    games: gamesSliceReducer,
    layout: layoutSliceReducer,
    gameAdminScreen: gameAdminScreenSliceReducer,
    platforms: platformSliceReducer,
    matchBestOf: matchBestOfSliceReducer,
    matchFormats: matchFormatSliceReducer,
    tournamentAdminListScreen: tournamentAdminListScreenSliceReducer,
    homeScreen: homeScreenSliceReducer,
    authentication: authenticationSliceReducer,
    countries: countrySliceReducer,
    screenAnimations: screenAnimationsSliceReducer,
    tournamentDetailsScreen: tournamentDetailsScreenSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

