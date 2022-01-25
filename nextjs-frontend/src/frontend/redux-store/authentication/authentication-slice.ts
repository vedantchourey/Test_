import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthenticationState } from './i-authentication-state';
import { fetchUserProfile } from '../../service-clients/profile-service-client';
import { IProfileResponse } from '../../service-clients/messages/i-profile';
import {v4} from 'uuid';

const initialState: IAuthenticationState = {
  isAuthenticated: false,
  role: undefined,
  checkStatus: 'idle',
  isUserRequestingLogin: false,
  profileFetchStatus: 'idle',
  userProfile: undefined,
  username: undefined,
  avatarBackgroundImageBlob: undefined,
  avatarImageBlob: undefined,
  forceFetchAvatarImageBlob: v4(),
  forceFetchAvatarBackgroundImageBlob: v4()
}

export const fetchUserProfileThunk = createAsyncThunk('authentication/userProfile', () => {
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
    clearUserProfile(state) {
      state.userProfile = undefined;
    },
    setUserProfile(state, action: PayloadAction<IProfileResponse | undefined>) {
      state.userProfile = action.payload;
    },
    setAvatarBlob(state, action: PayloadAction<string | undefined>) {
      state.avatarImageBlob = action.payload;
    },
    setAvatarBackgroundBlob(state, action: PayloadAction<string | undefined>) {
      state.avatarBackgroundImageBlob = action.payload;
    },
    forceFetchAvatarImageBlob(state) {
      state.forceFetchAvatarImageBlob = v4();
    },
    forceFetchAvatarBackgroundImageBlob(state) {
      state.forceFetchAvatarBackgroundImageBlob = v4();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileThunk.pending, (state) => {
      state.profileFetchStatus = 'loading';
    });
    builder.addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
      state.profileFetchStatus = 'success';
      state.userProfile = action.payload;
    });
    builder.addCase(fetchUserProfileThunk.rejected, (state) => {
      state.profileFetchStatus = 'error';
    });
  }
});

export const {
  setCheckLoginStatus,
  setIsLoggedIn,
  clearUserProfile,
  setAvatarBackgroundBlob,
  setAvatarBlob,
  setUserProfile,
  forceFetchAvatarImageBlob,
  forceFetchAvatarBackgroundImageBlob
} = authenticationSlice.actions;
const authenticationSliceReducer = authenticationSlice.reducer;
export default authenticationSliceReducer;
