import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ILayoutState from './i-layout-state';

export function getScreenDimensions(): { width: number; height: number } {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  return {width, height};
}

const initialState: ILayoutState = {
  window: {width: 0, height: 0},
  desktopHeaderHeight: 0,
  mobileHeaderHeight: 0
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateScreenDimensions(state: ILayoutState) {
      const {width, height} = getScreenDimensions();
      state.window.width = width;
      state.window.height = height;
    },
    setDesktopHeaderHeight: (state, action: PayloadAction<number>) => {
      state.desktopHeaderHeight = action.payload;
    },
    setMobileHeaderHeight: (state, action: PayloadAction<number>) => {
      state.mobileHeaderHeight = action.payload;
    }
  }
});

const layoutSliceReducer = layoutSlice.reducer;
export default layoutSliceReducer;
export const {updateScreenDimensions, setDesktopHeaderHeight, setMobileHeaderHeight} = layoutSlice.actions;


