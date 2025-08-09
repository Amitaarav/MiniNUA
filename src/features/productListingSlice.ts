import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductState } from '@/types';

const API_BASE = 'https://fakestoreapi.com';

const PRODUCTS_CACHE_KEY = 'cache.products';
const CATEGORIES_CACHE_KEY = 'cache.categories';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = (await res.json()) as Product[];
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(data));
    return data;
  }
);

export const fetchCategories = createAsyncThunk<string[]>(
  'products/fetchCategories',
  async () => {
    const cached = localStorage.getItem(CATEGORIES_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as string[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = (await res.json()) as string[];
    localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(data));
    return data;
  }
);

export type SortMode = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc';

const initialState: ProductState & { sort: SortMode } = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filter: { title: '', category: '' },
  sort: 'relevance',
};

const productListingSlice = createSlice({
  name: 'productListing',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ title: string; category: string }>) {
      state.filter = action.payload;
    },
    clearFilter(state) {
      state.filter = { title: '', category: '' };
    },
    setSort(state, action: PayloadAction<SortMode>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilter, clearFilter, setSort } = productListingSlice.actions;
export default productListingSlice.reducer;