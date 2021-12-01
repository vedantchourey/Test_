import { createSlice } from '@reduxjs/toolkit';
import ILayoutState from './ILayoutState';
import { Dimensions } from 'react-native';

function getScreenDimensions() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return {width, height};
}

const initialState: ILayoutState = {
  window: getScreenDimensions()
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


