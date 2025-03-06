import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createFollow, deleteFollow } from "../api/profilAPI";
import { createNotification } from "../../notifications/api/notificationAPI";

const followUser = createAsyncThunk(
  "profil/followUser",
  async ({ userId, followingId }: { userId: number; followingId: number }) => {
    const response = await createFollow(userId, followingId);

    // Créer une notification pour l'utilisateur suivi
    await createNotification(followingId, userId, "follow");

    return response;
  }
);

const unfollowUser = createAsyncThunk(
  "profil/unfollowUser",
  async ({ userId, followingId }: { userId: number; followingId: number }) => {
    const response = await deleteFollow(userId, followingId);
    return response;
  }
);

type ProfilState = {
  loading: boolean;
};

const initialState: ProfilState = {
  loading: false,
};

const profilSlice = createSlice({
  name: "profil",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(followUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(followUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(unfollowUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unfollowUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(unfollowUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export { followUser, unfollowUser };
export default profilSlice.reducer;
