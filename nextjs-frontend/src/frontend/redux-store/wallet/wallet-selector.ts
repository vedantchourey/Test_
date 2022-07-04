import { RootState } from '../redux-store';

export const cartDetailsSelector = (rootState: RootState): any => rootState.wallet.cart_details;
export const walletDetaislSelector = (rootState: RootState): any => ({
  balance: rootState.wallet.balance,
  transaction: rootState.wallet.transaction,
  withdrawAmount: rootState.wallet.withdrawAmount,
});
