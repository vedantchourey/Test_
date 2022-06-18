import { createSlice, } from '@reduxjs/toolkit';



let initialStateLocalStorage;

if (typeof window !== 'undefined') {
    // Perform localStorage action
    const initState = JSON.parse(localStorage.getItem('item') || '{}');
    if (Object.keys(initState).length !== 0) {
        initialStateLocalStorage = initState;
    }

}

const cartSlice = createSlice({
    name: 'cart',
    initialState:
        initialStateLocalStorage || {
            products: [],
            quantity: 0,
            total: 0,
            isFetching: false,
        },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.amount * action.payload.quantity;

            if (typeof window !== 'undefined') {
                // Perform localStorage action

                localStorage.setItem(
                    'item',
                    JSON.stringify({
                        products: state.products,
                        quantity: state.quantity,
                        total: state.total,
                    }),
                );
            }
        },

        updateQuantity: (state, action) => {
            // state.products.push(action.payload);
            // state.quantity += 1;
            const newId = action.payload.id
            const index = state.products.findIndex((item: any) => item.id === newId);
            const amount = state.products[index].amount;
            const oldQty = state.products[index].quantity;
            const newQty = action.payload.quantity;
            state.total += ((newQty - oldQty) * amount);
            state.products[index].quantity = newQty;

            if (newQty === 0) {
                state.quantity -= 1;
                state.products.splice(index, 1);
            }

            if (typeof window !== 'undefined') {
                // Perform localStorage action

                localStorage.setItem(
                    'item',
                    JSON.stringify({
                        products: state.products,
                        quantity: state.quantity,
                        total: state.total,
                    }),
                );
            }
        },
        removeProduct: (state, action) => {
            const id = action.payload.id
            const index = state.products.findIndex((item: any) => item.id === id);
            state.total -= state.products[index].amount * state.products[index].quantity;
            state.quantity -= 1;

            state.products.splice(index, 1);

            if (typeof window !== 'undefined') {
                // Perform localStorage action

                localStorage.setItem(
                    'item',
                    JSON.stringify({
                        products: state.products,
                        quantity: state.quantity,
                        total: state.total,
                    }),
                );
            }
        },
        clearCart: (state: any) => {
            state.products = []
            state.quantity = 0
            state.total = 0
            state.isFetching = false

            if (typeof window !== 'undefined') {
                // Perform localStorage action
                localStorage.setItem(
                    'item',
                    JSON.stringify({
                        products: state.products,
                        quantity: state.quantity,
                        total: state.total,
                    }),
                );
            }
        }

    }
});

export const { addProduct, updateQuantity, removeProduct, clearCart } = cartSlice.actions;
const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;

