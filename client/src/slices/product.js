import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { backendUrl } from "../serverUrl"

const initialState = {
    allProducts: [],
    queryProduct: [],
    products: [],
    totalProduct: 0,
    singleProduct: {}
}

// single product 
export const getSingleProduct = createAsyncThunk(
    "product/fetch-singleProduct",
    async (id) => {
        const response = await axios.get(`${backendUrl}product/productDetail/${id}`)
        return response.data
    }
)

export const fetchCategoryProducts = createAsyncThunk(
    "product/fetch-categoryProduct",
    async () => {
        const response = await axios.get(`${backendUrl}product/getCategoryProduct`)

        return response.data
    }
)

export const fetchProductByQuery = createAsyncThunk(
    'product/fetchProduct-query',
    async (query) => {
        const response = await axios.get(`${backendUrl}product/getAllProducts?category=${query}&sort=price`)

        return response.data
    }
)

// for admin
export const getProducts = createAsyncThunk(
    'product/get-products-admin',
    async (pageNo) => {
        const response = await axios.get(`${backendUrl}product/getAllProducts?pageNo=${pageNo}`)
        return response.data
    }
)


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.loading = false
                state.allProducts = action.payload.myProductCategory
                // console.log(action.payload.myProductCategory)
            })
            .addCase(fetchProductByQuery.pending, (state) => {
                state.qloading = true
            })

            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductByQuery.fulfilled, (state, action) => {
                state.qloading = false
                state.queryProduct = action.payload.data
                // console.log(action.payload)
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data
                state.totalProduct = action.payload.totalProduct
                // console.log(action.payload)
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false
                state.singleProduct = action.payload.product

                // console.log(action.payload)
            })
    }
})


export default productSlice.reducer