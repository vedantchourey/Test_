import { configureStore } from '@reduxjs/toolkit';
import gamesSliceReducer from './games/games-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import layoutSliceReducer from './layout/layout-slice';
import platformSliceReducer from './platforms/platforms-slice';
import matchBestOfSliceReducer from './match-best-of/match-best-ofs-slice';
import matchFormatSliceReducer from './match-format/match-formats-slice';
import authenticationSliceReducer from './authentication/authentication-slice';
import countrySliceReducer from './countries/country-slice';
import screenAnimationsSliceReducer from './screen-animations/screen-animation-slice';

const reduxStore = configureStore({
  reducer: {
    games: gamesSliceReducer,
    layout: layoutSliceReducer,
    screenAnimations: screenAnimationsSliceReducer,
    platforms: platformSliceReducer,
    matchBestOf: matchBestOfSliceReducer,
    matchFormats: matchFormatSliceReducer,
    authentication: authenticationSliceReducer,
    countries: countrySliceReducer
  }
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default reduxStore;

