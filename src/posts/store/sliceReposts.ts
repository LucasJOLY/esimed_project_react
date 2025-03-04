import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRepost, deleteRepost } from "../api/repostsAPI";

const addRepost = createAsyncThunk(
  "likes/addLike",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const timestamp = Date.now();
    const response = await createRepost(postId, userId, timestamp);
    return response;
  }
);

const destroyRepost = createAsyncThunk(
  "likes/destroyLike",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await deleteRepost(postId, userId);
    return response;
  }
);

type RepostState = {
  loading: boolean;
};

const initialState: RepostState = {
  loading: false,
};

const repostSlice = createSlice({
  name: "reposts",
  initialState,
  reducers: {},
});

export { addRepost, destroyRepost };
export default repostSlice.reducer;
