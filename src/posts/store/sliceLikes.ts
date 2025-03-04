import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createLike, deleteLike } from "../api/likesAPI";

const addLike = createAsyncThunk(
  "likes/addLike",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await createLike(postId, userId);
    return response;
  }
);

const destroyLike = createAsyncThunk(
  "likes/destroyLike",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await deleteLike(postId, userId);
    return response;
  }
);

type LikeState = {
  loading: boolean;
};

const initialState: LikeState = {
  loading: false,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLike.pending, (state) => {
      state.loading = true;
    });
  },
});

export { addLike, destroyLike };
export default likeSlice.reducer;
