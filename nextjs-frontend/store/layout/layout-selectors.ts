import { RootState } from '../redux-store';
import { DeviceType, deviceTypes } from './device-types';

import { createSelector } from '@reduxjs/toolkit';
import { getByPercentage } from '../../utils/screen-measurement-utils';

export const layoutSelector = (state: RootState) => state.layout;
export const screenHeightSelector = (state: RootState) => state.layout.window.height;
export const screenWidthSelector = (state: RootState) => state.layout.window.width;
export const desktopHeaderHeightSelector = (state: RootState) => state.layout.desktopHeaderHeight;
export const mobileHeaderHeightSelector = (state: RootState) => state.layout.mobileHeaderHeight;


//Memoized Selectors

const windowSelector = (rootState: RootState) => rootState.layout.window;
const deviceTypeSelector = (rootState: RootState, condition: DeviceType) => condition;

export const isDeviceTypeSelector = createSelector([windowSelector, deviceTypeSelector], (window, condition) => {
  return condition(window);
});

const percentSelector = (state: RootState, percent: number) => percent;

export const heightByPercentageSelector = createSelector([screenHeightSelector, percentSelector], (screenHeight, percentage) => {
  return getByPercentage(screenHeight, percentage)
});

export const widthByPercentageSelector = createSelector([screenWidthSelector, percentSelector], (screenWidth, percentage) => {
  return getByPercentage(screenWidth, percentage)
});


export const getAppHeaderHeightSelector = createSelector([mobileHeaderHeightSelector, desktopHeaderHeightSelector, windowSelector], (mobileHeight, desktopHeight, window) => {
  if (deviceTypes.desktop(window)) return desktopHeight;
  return mobileHeight;
});
