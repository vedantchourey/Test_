import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationState } from './i-authentication-state';
import { AuthScreenType } from '../../models/noob-types';

const initialState: IAuthenticationState = {
  isAuthenticated: false,
  role: undefined,
  checkStatus: 'idle',
  isUserRequestingLogin: false,
  authScreen: 'login'
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCheckStatus(state, action: PayloadAction<'idle' | 'loading' | 'success'>) {
      state.checkStatus = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setIsUserRequestingLogin(state, action: PayloadAction<boolean>) {
      state.isUserRequestingLogin = action.payload;
    },
    setAuthScreen(state, action: PayloadAction<AuthScreenType>) {
      state.authScreen = action.payload;
    }
  }
});

export const {setCheckStatus, setIsLoggedIn, setIsUserRequestingLogin, setAuthScreen} = authenticationSlice.actions;
const authenticationSliceReducer = authenticationSlice.reducer;
export default authenticationSliceReducer;
