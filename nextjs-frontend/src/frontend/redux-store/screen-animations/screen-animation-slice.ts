import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScreenAnimations } from './i-screen-animations';

const initialState: IScreenAnimations = {
  isLoading: false
};

const screenAnimationsSlice = createSlice({
  name: 'screenAnimations',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
});

export const {setIsLoading} = screenAnimationsSlice.actions;
const screenAnimationsSliceReducer = screenAnimationsSlice.reducer;
export default screenAnimationsSliceReducer;
