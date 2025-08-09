import { combineReducers } from '@reduxjs/toolkit';
import productListingReducer from '../features/productListingSlice';
import productDetailReducer from '../features/productDetailsSlice';
import shoppingCartReducer from '../features/shoppingCartSlice';
import checkoutReducer from '../features/checkOutSlice';
const rootReducer = combineReducers({
  productListing: productListingReducer,
  productDetail: productDetailReducer,
  shoppingCart: shoppingCartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;