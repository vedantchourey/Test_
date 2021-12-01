import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameAdminScreenState } from './IGameAdminScreenState';

const initialState: IGameAdminScreenState = {
  gameSearchQuery: ''
};

const gameAdminScreenSlice = createSlice({
  name: 'gameAdminScreen',
  initialState,
  reducers: {
    updateSearchQuery(state, query: PayloadAction<string>) {
      state.gameSearchQuery = query.payload;
    }
  }
});

const gameAdminScreenSliceReducer = gameAdminScreenSlice.reducer;
export const {updateSearchQuery} = gameAdminScreenSlice.actions;
export default gameAdminScreenSliceReducer;
