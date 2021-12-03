import {WindowDimensions} from './i-layout-state';

export type DeviceType = (dimensions: WindowDimensions) => boolean;

export const deviceTypes = {
  desktop: (dimensions: WindowDimensions) => dimensions.width >= 768
}
