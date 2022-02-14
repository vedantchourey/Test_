import { RootState } from '../redux-store';
import { DeviceType, deviceTypes } from './device-types';
import { createSelector } from '@reduxjs/toolkit';
import { WindowDimensions } from './i-layout-state';

export const screenWidthSelector = (state: RootState): number => state.layout.window.width;
export const desktopHeaderHeightSelector = (state: RootState): number => state.layout.desktopHeaderHeight;
export const mobileHeaderHeightSelector = (state: RootState): number => state.layout.mobileHeaderHeight;

//Memoized Selectors
const windowSelector = (rootState: RootState): WindowDimensions => rootState.layout.window;
const deviceTypeSelector = (rootState: RootState, condition: DeviceType): (dimensions: WindowDimensions) => boolean => condition;

export const isDeviceTypeSelector = createSelector([windowSelector, deviceTypeSelector], (window, condition) => {
  return condition(window);
});

export const getAppHeaderHeightSelector = createSelector([mobileHeaderHeightSelector, desktopHeaderHeightSelector, windowSelector], (mobileHeight, desktopHeight, window) => {
  if (deviceTypes.desktop(window)) return desktopHeight + 20;
  return mobileHeight;
});
