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
            const index = state.products.findIndex(item => item.id == newId);
            const amount = state.products[index].amount;
            const oldQty = state.products[index].quantity;
            const newQty = action.payload.quantity;
            state.total += ((newQty - oldQty) * amount);
            state.products[index].quantity = newQty;

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

export const { addProduct, updateQuantity } = cartSlice.actions;
const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;

