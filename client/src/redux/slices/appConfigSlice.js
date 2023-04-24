import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
    try {
        const response = await axiosClient.get("/user/getMyInfo");
        return response.result;
    } catch (err) {
        return Promise.reject(err);
    }
});

export const updateMyProfile = createAsyncThunk(
    "user/updateMyProfile",
    async (body) => {
        try {
            const response = await axiosClient.put("/user/", body);
            return response.result;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: {
        isLoading: false,
        myProfile: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.myProfile = action.payload.user;
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.myProfile = action.payload.user;
            });
    },
});

export default appConfigSlice.reducer;

export const { setLoading } = appConfigSlice.actions;
