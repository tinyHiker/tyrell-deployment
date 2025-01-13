import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import booksApi from "./features/books/booksApi"
import ordersApi from "./features/orders/ordersApi"
import quotesApi from "./features/quotes/quotesApi"
import realUsersApi from "./features/real-users/realUsersApi"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [quotesApi.reducerPath]: quotesApi.reducer,
        [realUsersApi.reducerPath]: realUsersApi.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware, quotesApi.middleware, realUsersApi.middleware)
    
})