import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payments: [],
  selectedPayment: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    selectPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },
});

export const { setPayments, selectPayment, clearSelectedPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
