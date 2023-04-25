import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
    try {
        const response = await axiosClient.get("/user/getFeedData");
        console.log("user Profile", response);
        return response.result;
    } catch (err) {
        return Promise.reject(err);
    }
});

// export const likeAndUnlikePost = createAsyncThunk(
//     "post/likeAndUnlike",
//     async (body) => {
//         try {
//             const response = await axiosClient.post("/posts/like", body);
//             return response.result.post;
//         } catch (error) {
//             return Promise.reject(error);
//         }
//     }
// );

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
        feedData: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) => {
            state.feedData = action.payload;
        });
        // .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        //     // const post = action.payload;
        //     // const index = state?.userProfile?.posts?.findIndex(
        //     //     (item) => item._id === post._id
        //     // );
        //     // console.log("postslice", index);
        //     // if (index !== undefined && index !== -1) {
        //     //     state.userProfile.posts[index] = post;
        //     // }
        // });
    },
});

export default feedSlice.reducer;
