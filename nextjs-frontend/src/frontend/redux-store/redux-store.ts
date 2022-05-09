import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layoutSliceReducer from "./layout/layout-slice";
import authenticationSliceReducer from "./authentication/authentication-slice";
import countrySliceReducer from "./countries/country-slice";
import screenAnimationsSliceReducer from "./screen-animations/screen-animation-slice";
import platformSliceReducer from "./platforms/platform-slice";
import { gameSliceReducer, formatSliceReducer } from "./games/game-slice";
import matchBestOfSliceReducer from "./match-best-of/match-best-of-slice";
import matchFormatSliceReducer from "./match-format/match-format-slice";

const reduxStore = configureStore({
  reducer: {
    layout: layoutSliceReducer,
    screenAnimations: screenAnimationsSliceReducer,
    authentication: authenticationSliceReducer,
    countries: countrySliceReducer,
    platforms: platformSliceReducer,
    games: gameSliceReducer,
    formats: formatSliceReducer,
    matchBestOfs: matchBestOfSliceReducer,
    matchFormats: matchFormatSliceReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default reduxStore;
