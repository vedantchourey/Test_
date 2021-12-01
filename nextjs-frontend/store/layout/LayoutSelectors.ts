import { RootState } from '../Store';
import { DeviceType } from './DeviceTypes';
import { getByPercentage } from '../../utils/ScreenMeasurementUtils';
import { createSelector } from '@reduxjs/toolkit';

export const layoutSelector = (state: RootState) => state.layout;
export const screenHeightSelector = (state: RootState) => state.layout.window.height;
export const screenWidthSelector = (state: RootState) => state.layout.window.width;

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
