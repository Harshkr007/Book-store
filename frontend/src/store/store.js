import {configureStore} from '@reduxjs/toolkit';

import cartReducer from "./features/cart/cartSlice.js"
import booksApi from './features/book/bookApiSlice.js';
import orderApi from './features/order/orderApiSlice.js';

export const store = configureStore({
    reducer: {
        cart : cartReducer,
        [booksApi.reducerPath]:booksApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(booksApi.middleware,orderApi.middleware),
})