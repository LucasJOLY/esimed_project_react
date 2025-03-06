import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRepost, deleteRepost } from "../api/repostsAPI";

const addRepost = createAsyncThunk(
  "reposts/addRepost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const timestamp = Date.now();
    const response = await createRepost(postId, userId, timestamp);
    return response;
  }
);

const destroyRepost = createAsyncThunk(
  "reposts/destroyRepost",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await deleteRepost(postId, userId);
    return response;
  }
);

type RepostState = {
  repostLoading: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: RepostState = {
  repostLoading: "idle",
};

const repostSlice = createSlice({
  name: "reposts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRepost.pending, (state) => {
      state.repostLoading = "loading";
    });
    builder.addCase(addRepost.fulfilled, (state) => {
      state.repostLoading = "succeeded";
    });
    builder.addCase(destroyRepost.pending, (state) => {
      state.repostLoading = "loading";
    });
    builder.addCase(destroyRepost.fulfilled, (state) => {
      state.repostLoading = "succeeded";
    });
  },
});

export { addRepost, destroyRepost };
export default repostSlice.reducer;
