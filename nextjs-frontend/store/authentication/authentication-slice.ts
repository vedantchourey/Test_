import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationState } from './i-authentication-state';
import { AuthScreenType } from '../../models/noob-types';
import { fetchUserProfile } from '../../services/front-end-services/auth/auth-service';

const initialState: IAuthenticationState = {
  isAuthenticated: false,
  role: undefined,
  checkStatus: 'idle',
  isUserRequestingLogin: false,
  authScreen: 'login',
  profileFetchStatus: 'idle',
  userProfile: undefined,
  username: undefined
}

export const fetchUserProfileThunk = createAsyncThunk('authentication/userProfile', (arg, thunkAPI) => {
  return fetchUserProfile();
});

type isLoggedIn = { isLoggedIn: false, username: undefined } | { isLoggedIn: true, username: string }

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCheckLoginStatus(state, action: PayloadAction<'idle' | 'loading' | 'success'>) {
      state.checkStatus = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<isLoggedIn>) {
      state.isAuthenticated = action.payload.isLoggedIn;
      state.username = action.payload.username;
    },
    setIsUserRequestingLogin(state, action: PayloadAction<boolean>) {
      state.isUserRequestingLogin = action.payload;
    },
    setAuthScreen(state, action: PayloadAction<AuthScreenType>) {
      state.authScreen = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfileThunk.pending, (state, action) => {
      state.profileFetchStatus = 'loading';
    });
    builder.addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
      state.profileFetchStatus = 'success';
      state.userProfile = action.payload;
    });
    builder.addCase(fetchUserProfileThunk.rejected, (state, action) => {
      state.profileFetchStatus = 'error';
    })
  }
});

export const {setCheckLoginStatus, setIsLoggedIn, setIsUserRequestingLogin, setAuthScreen} = authenticationSlice.actions;
const authenticationSliceReducer = authenticationSlice.reducer;
export default authenticationSliceReducer;
