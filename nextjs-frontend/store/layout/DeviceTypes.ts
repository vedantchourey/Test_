import {WindowDimensions} from './ILayoutState';

export type DeviceType = (dimensions: WindowDimensions) => boolean;

export const deviceTypes = {
  desktop: (dimensions: WindowDimensions) => dimensions.width >= 768
}