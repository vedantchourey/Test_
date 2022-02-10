import {WindowDimensions} from './i-layout-state';

export type DeviceType = (dimensions: WindowDimensions) => boolean;

export const deviceTypes = {
  desktop: (dimensions: WindowDimensions): boolean => dimensions.width >= 768
}
