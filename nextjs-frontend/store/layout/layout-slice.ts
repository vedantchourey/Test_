import { createSlice } from '@reduxjs/toolkit';
import ILayoutState from './i-layout-state';

export function getScreenDimensions() {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  return {width, height};
}

const initialState: ILayoutState = {
  window: {width: 0, height: 0}
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
  }
});

const layoutSliceReducer = layoutSlice.reducer;
export default layoutSliceReducer;
export const {updateScreenDimensions} = layoutSlice.actions;


