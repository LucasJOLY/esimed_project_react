import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createLike, deleteLike } from "../api/likesAPI";
import { createNotification } from "../../notifications/api/notificationAPI";
import { Post } from "../type";

const addLike = createAsyncThunk(
  "likes/addLike",
  async ({ post, userId }: { post: Post; userId: number }) => {
    const response = await createLike(post.id, userId);
    if (post.userId !== userId) {
      await createNotification(post.userId, userId, "like", post.id);
    }

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
    builder.addCase(addLike.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(destroyLike.pending, (state) => {
      state.loading = true;
    });
  },
});

export { addLike, destroyLike };
export default likeSlice.reducer;
