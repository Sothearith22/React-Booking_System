import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { setCustomers, selectCustomer, clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;
