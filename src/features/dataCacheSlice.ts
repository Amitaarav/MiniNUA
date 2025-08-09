import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface DataCacheState {
    productList: Record<string, any> | null;
    productDetails: Record<string, any> | null;
}

const initialState: DataCacheState = {
    productList: null,
    productDetails: null,
};

const dataCacheSlice = createSlice({
    name: 'dataCache',
    initialState,
    reducers: {
        cacheProductList: (state, action: PayloadAction<Record<string, any>>) => {
            state.productList = action.payload;
        },
        cacheProductDetails: (state, action: PayloadAction<Record<string, any>>) => {
            state.productDetails = action.payload;
        },
        clearCache: (state) => {
            state.productList = null;
            state.productDetails = null;
        },
    },
});

export const { cacheProductList, cacheProductDetails, clearCache } = dataCacheSlice.actions;
export default dataCacheSlice.reducer;