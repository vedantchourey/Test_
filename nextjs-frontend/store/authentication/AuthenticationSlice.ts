import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationState } from './IAuthenticationState';
import { AuthScreen } from '../../components/common/authentication/AuthScreenTypes';

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
    setAuthScreen(state, action: PayloadAction<AuthScreen>) {
      state.authScreen = action.payload;
    }
  }
});

export const {setCheckStatus, setIsLoggedIn, setIsUserRequestingLogin, setAuthScreen} = authenticationSlice.actions;
const authenticationSliceReducer = authenticationSlice.reducer;
export default authenticationSliceReducer;
