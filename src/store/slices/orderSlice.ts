import { CartItem } from '$models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderState {
    orderItems: CartItem[];
}

const initialState: OrderState = {
    orderItems: [],
};

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        addItem(state, {payload}: PayloadAction<CartItem>) {
            if (state.orderItems.find(item => item.id === payload.id)) {
                state.orderItems = state.orderItems.map((item) =>
                    item.id === payload.id ? payload : item
                );
            } else {
                state.orderItems = [...state.orderItems, payload]
            }
        },
        removeItem(state, {payload}: PayloadAction<string>){
            state.orderItems = state.orderItems.filter(item => item.id !== payload)
        }

    },
});

export default orderSlice.reducer;
