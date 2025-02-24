import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface IUserOrdersState {
  wsConnected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: IUserOrdersState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    wsUserOrdersConnecting: (state) => {
      state.wsConnected = false;
      state.error = null;
    },
    wsUserOrdersOpen: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsUserOrdersClose: (state) => {
      state.wsConnected = false;
    },
    wsUserOrdersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.wsConnected = false;
    },
    /** Когда приходит сообщение от WS */
    wsUserOrdersMessage: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    }
  }
});

export const {
  wsUserOrdersConnecting,
  wsUserOrdersOpen,
  wsUserOrdersClose,
  wsUserOrdersError,
  wsUserOrdersMessage
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
