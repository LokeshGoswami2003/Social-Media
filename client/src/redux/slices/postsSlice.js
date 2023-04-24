import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body) => {
        try {
            const response = await axiosClient.post(
                "/user/getUserProfile",
                body
            );
            console.log("user Profile", response);
            return response.result;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        });
    },
});

export default postsSlice.reducer;
