import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { backendUrl } from "../serverUrl"


const initialState = {
    orders: [],
    allOrders:[],
    singleOrderInfo: []
}

   export const createOrder = createAsyncThunk(
        'order/create-order',
       async (finalprocess) => {
        const response =  await axios.post(`${backendUrl}order/createOrder`,{
            ...finalprocess
        }, {
            withCredentials:true
        })
        return response.data
       } 
    )



// update order -- admin
   export const updateOrder = createAsyncThunk(
        'order/update-order-admin',
       async ({orderStatus,id}) => {
        const response =  await axios.put(`${backendUrl}order/admin-update-order/${id}`,{
            orderStatus
        }, {
            withCredentials:true
        })
        return response.data
       } 
    )


   export const allOrder = createAsyncThunk(
        'order/getAll-order-user',
       async () => {
        const response = await axios.get(`${backendUrl}order/allOrder`,{
            withCredentials:true
        }) 
        return response.data
       } 
    )

   export const allOrderAdmin = createAsyncThunk(
        'order/getAll-order-admin',
       async () => {
        const response = await axios.get(`${backendUrl}order/admin-all-orders`,{
            withCredentials:true
        }) 
        return response.data
       } 
    ) 

    
   export const singleOrder = createAsyncThunk(
    'order/single-order',
   async (id) => {
    const response = await axios.get(`${backendUrl}order/singleOrder/${id}`,{
        withCredentials:true
    }) 
    return response.data
   } 
)


const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false
            console.log(action.error.message)
            state.error = "some error occured"
        })
        .addCase(allOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(allOrder.fulfilled, (state, action) => {
            state.loading = false
            console.log("orders ",action.payload)
            state.orders = action.payload.orders
        })
        .addCase(allOrder.rejected, (state, action) => {
            state.loading = false
            console.log(action.error.message)
            state.error = "some error occured"
        })
        .addCase(allOrderAdmin.pending, (state) => {
            state.loading = true
        })
        .addCase(allOrderAdmin.fulfilled, (state, action) => {
            state.loading = false
            console.log("orders ",action.payload)
            state.allOrders = action.payload.orders
        })
        .addCase(allOrderAdmin.rejected, (state, action) => {
            state.loading = false
            console.log(action.error.message)
            state.error = "some error occured"
        })
        .addCase(updateOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false
            console.log("orders  update",action.payload)
            // state.allOrders = action.payload.orders
        })
        .addCase(updateOrder.rejected, (state, action) => {
            state.loading = false
            console.log(action.error.message)
            state.error = "some error occured"
        })
        .addCase(singleOrder.pending, (state) => {
            state.Sloading = true
        })
        .addCase(singleOrder.fulfilled, (state, action) => {
            state.Sloading = false
            // console.log("orders  single",action.payload)
            state.singleOrderInfo = action.payload.getorder
        })
    }
})


export default orderSlice.reducer