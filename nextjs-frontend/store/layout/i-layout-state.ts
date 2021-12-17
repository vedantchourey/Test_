export type WindowDimensions = {
  width: number,
  height: number
};

export default interface ILayoutState {
  window: WindowDimensions;
  desktopHeaderHeight:  number;
  mobileHeaderHeight: number;
}
