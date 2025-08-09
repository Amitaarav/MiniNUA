import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CheckoutState } from '@/types';

const initialState: CheckoutState = {
  isSubmitting: false,
  error: null,
  success: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    submitOrder(state) {
      state.isSubmitting = true;
      state.error = null;
      state.success = false;
    },
    submitOrderSuccess(state) {
      state.isSubmitting = false;
      state.success = true;
    },
    submitOrderFailure(state, action: PayloadAction<string>) {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    resetCheckout(state) {
      state.isSubmitting = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { submitOrder, submitOrderSuccess, submitOrderFailure, resetCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;