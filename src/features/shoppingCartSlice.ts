import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ShoppingCartState, CartItem } from '@/types';

const CART_KEY = 'cart.state';

const loadCart = (): ShoppingCartState => {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return { items: [], grandTotal: 0 };
  try {
    const parsed = JSON.parse(raw) as ShoppingCartState;
    if (parsed && Array.isArray(parsed.items)) {
      const total = parsed.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
      return { items: parsed.items, grandTotal: total };
    }
  } catch {}
  return { items: [], grandTotal: 0 };
};

const persistCart = (state: ShoppingCartState) => {
  localStorage.setItem(CART_KEY, JSON.stringify(state));
};

const initialState: ShoppingCartState = loadCart();

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + action.payload.quantity, 10);
      } else {
        state.items.push({ ...action.payload, quantity: Math.min(action.payload.quantity, 10) });
      }
      state.grandTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      persistCart(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.grandTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      persistCart(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = Math.max(1, Math.min(action.payload.quantity, 10));
      }
      state.grandTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      persistCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.grandTotal = 0;
      persistCart(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;