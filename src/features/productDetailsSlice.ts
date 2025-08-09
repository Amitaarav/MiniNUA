import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { type Product, type ProductDetailState } from '../types';

const API_BASE = 'https://fakestoreapi.com';
const PRODUCT_DETAIL_CACHE_PREFIX = 'cache.product.';

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProductDetail = createAsyncThunk<Product, string>(
  'productDetail/fetchProductDetail',
  async (productId: string) => {
    const cacheKey = `${PRODUCT_DETAIL_CACHE_PREFIX}${productId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Product;
        if (parsed) return parsed;
      } catch {}
    }
    const response = await fetch(`${API_BASE}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const product = (await response.json()) as Product;
    localStorage.setItem(cacheKey, JSON.stringify(product));
    return product;
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export const selectProductDetail = (state: RootState) => state.productDetail.product;

export default productDetailSlice.reducer;