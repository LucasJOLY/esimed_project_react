import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createFavorite, deleteFavorite, getFavoritesByUserId } from "../api/favoritesAPI";
import { createNotification } from "../../notifications/api/notificationAPI";
import { Post, Favorite } from "../type";

const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ post, userId }: { post: Post; userId: number }) => {
    const response = await createFavorite(post.id, userId);
    if (post.userId !== userId) {
      await createNotification(post.userId, userId, "favorite", post.id);
    }
    return response;
  }
);

const destroyFavorite = createAsyncThunk(
  "favorites/destroyFavorite",
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await deleteFavorite(postId, userId);
    return response;
  }
);

const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async ({ userId, byLikes, byTimeDesc }: { userId: number; byLikes: boolean; byTimeDesc: boolean }) => {
    const response = await getFavoritesByUserId(userId, byLikes, byTimeDesc);
    return response;
  }
);

type FavoriteState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  favorites: Favorite[];
};

const initialState: FavoriteState = {
  loading: "idle",
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addFavorite.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(destroyFavorite.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(destroyFavorite.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export { addFavorite, destroyFavorite, fetchFavorites };
export default favoriteSlice.reducer;
