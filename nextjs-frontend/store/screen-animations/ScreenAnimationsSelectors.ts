import { RootState } from '../Store';

export const isLoadingSelector = (rootState: RootState) => rootState.screenAnimations.isLoading;
