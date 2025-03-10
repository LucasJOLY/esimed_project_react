import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchPosts, searchUsers } from "../api/searchAPI";
import { Post } from "../../posts/type";
import { User } from "../../auth/types";

export const searchPostsThunk = createAsyncThunk(
  "search/searchPosts",
  async ({ query }: { query: string }) => {
    const response = await searchPosts(query);
    return response;
  }
);

export const searchUsersThunk = createAsyncThunk(
  "search/searchUsers",
  async ({ query }: { query: string }) => {
    const response = await searchUsers(query);
    return response;
  }
);

// fais une fonction qui trie les posts par nombre de likes ou par date
const sortPosts = (posts: Post[], byLikes: boolean, byTimeDesc: boolean) => {
  if (byLikes) {
    return posts.sort((a, b) => b.likes.length - a.likes.length);
  }
  if (byTimeDesc) {
    return posts.sort((a, b) => b.created_at - a.created_at);
  } else {
    return posts.sort((a, b) => a.created_at - b.created_at);
  }
};

type SearchState = {
  searchedPosts: Post[];
  searchedUsers: User[];
  loading: boolean;
};

const initialState: SearchState = {
  searchedPosts: [],
  searchedUsers: [],
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchedPosts = [];
      state.searchedUsers = [];
      state.loading = false;
    },
    orderPosts: (state, action) => {
      state.searchedPosts = sortPosts(
        state.searchedPosts,
        action.payload.byLikes,
        action.payload.byTimeDesc
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPostsThunk.fulfilled, (state, action) => {
        state.searchedPosts = action.payload;
        state.loading = false;
      })
      .addCase(searchPostsThunk.pending, (state) => {
        state.searchedPosts = [];
        state.loading = true;
      })
      .addCase(searchPostsThunk.rejected, (state) => {
        state.searchedPosts = [];
        state.loading = false;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.searchedUsers = action.payload;
        state.loading = false;
      })
      .addCase(searchUsersThunk.pending, (state) => {
        state.searchedUsers = [];
        state.loading = true;
      })
      .addCase(searchUsersThunk.rejected, (state) => {
        state.searchedUsers = [];
        state.loading = false;
      });
  },
});

export const { clearSearch, orderPosts } = searchSlice.actions;
export default searchSlice.reducer;
