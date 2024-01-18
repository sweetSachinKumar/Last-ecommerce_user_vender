import {configureStore } from "@reduxjs/toolkit"
import userSlice from "../slices/user"
import ProductSlice from "../slices/product"
import cartSlice from "../slices/cart"
import orderSlice from "../slices/order"

const store = configureStore({
    reducer: {
        user: userSlice,
        product: ProductSlice,
        cart: cartSlice,
        order: orderSlice
    }
})

export default store