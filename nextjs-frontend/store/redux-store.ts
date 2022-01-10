import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import layoutSliceReducer from './layout/layout-slice';
import authenticationSliceReducer from './authentication/authentication-slice';
import countrySliceReducer from './countries/country-slice';
import screenAnimationsSliceReducer from './screen-animations/screen-animation-slice';

const reduxStore = configureStore({
  reducer: {
    layout: layoutSliceReducer,
    screenAnimations: screenAnimationsSliceReducer,
    authentication: authenticationSliceReducer,
    countries: countrySliceReducer
  }
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default reduxStore;

