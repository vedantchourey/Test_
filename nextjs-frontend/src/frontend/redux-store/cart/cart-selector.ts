import { RootState } from '../redux-store';

export const cartSelector = (rootState: RootState): any => rootState.cart;
