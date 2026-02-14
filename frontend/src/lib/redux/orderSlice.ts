import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    orderItems: any;
    id: string;
    status: 'RECEIVED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
    totalAmount: string;
    createdAt: string;
    items: any[];
}

interface OrderState {
    currentOrder: Order | null;
    history: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    currentOrder: null,
    history: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setCurrentOrder: (state, action: PayloadAction<Order>) => {
            state.currentOrder = action.payload;
        },
        updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
            if (state.currentOrder && state.currentOrder.id === action.payload.orderId) {
                state.currentOrder.status = action.payload.status;
            }
            const orderInHistory = state.history.find(o => o.id === action.payload.orderId);
            if (orderInHistory) {
                orderInHistory.status = action.payload.status;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setCurrentOrder, updateOrderStatus, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
