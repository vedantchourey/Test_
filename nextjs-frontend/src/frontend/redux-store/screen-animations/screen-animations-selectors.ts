import { RootState } from '../redux-store';

export const isLoadingSelector = (rootState: RootState): boolean => rootState.screenAnimations.isLoading;
