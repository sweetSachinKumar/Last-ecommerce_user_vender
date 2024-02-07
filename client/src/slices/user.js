import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { backendUrl } from "../serverUrl"

const initialState = {
    isAuthenticated: false,
    user: null,
    users: [],
    usersLength: 0,
    loading: true
}

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async () => {
        const response = await axios.get(`${backendUrl}user/getuser`,
            { withCredentials: true }
        )
        return response.data
    }
)

// for admin
export const getAllusers = createAsyncThunk(
    'user/getAllUser-admin',
    async (pageNo) => {
        const response = await axios.get(`${backendUrl}user/getAllUser?pageNo=${1}`,
            { withCredentials: true }
        )
        return response.data
    }
)

export const updateUserInformation = createAsyncThunk(
    'user/update-userinfo',
    async ({ email, password, phoneNumber, name }) => {
        const response = await axios.put(`${backendUrl}user/update-user-info`,
            { email, password, phoneNumber, name },
            { withCredentials: true }
        )
        return response.data
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false
                state.user = action.payload.user
                console.log(action.payload)
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
                state.isAuthenticated = false
            })
            .addCase(getAllusers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllusers.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false
                state.users = action.payload.users
                state.usersLength = action.payload?.usersLength
                console.log(action.payload)
            })
            .addCase(getAllusers.rejected, (state, action) => {
                state.loading = false
                state.error = "some error occured"
                state.isAuthenticated = false
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user

            })
    }
})
//  8810570672
export default userSlice.reducer;