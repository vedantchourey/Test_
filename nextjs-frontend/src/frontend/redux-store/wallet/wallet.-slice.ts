import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    balance: 100,
    withdrawAmount: 0,
    cart_details: {
        amount: 0,
        service_charge: 0,
        total_amount: 0,
        gst: 0,
    },
    transaction: []
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {
        setWalletDetails: (state, action: PayloadAction<any>) => {
            state.balance = action.payload?.wallet?.balance || 0
            state.transaction = action.payload.transaction
            state.withdrawAmount = action.payload?.user?.withdrawAmount
        },
        setCartDetails: (state, action: PayloadAction<any>) => {
            state.cart_details = action.payload
        }
    }
});

export const { setWalletDetails, setCartDetails } = walletSlice.actions;
const walletSliceReducer = walletSlice.reducer;
export default walletSliceReducer;
