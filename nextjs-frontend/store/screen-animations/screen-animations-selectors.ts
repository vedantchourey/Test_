import { RootState } from '../redux-store';

export const isLoadingSelector = (rootState: RootState) => rootState.screenAnimations.isLoading;
