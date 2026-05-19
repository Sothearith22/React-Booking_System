import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import bookingReducer from '../features/bookings/store/bookingSlice';
import customerReducer from '../features/customers/store/customerSlice';
import paymentReducer from '../features/payments/store/paymentSlice';
import roomReducer from '../features/rooms/store/roomSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  customers: customerReducer,
  payments: paymentReducer,
  rooms: roomReducer,
  
});

export default rootReducer;
