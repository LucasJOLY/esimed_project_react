import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../type";
import {
  createPost,
  getFollowedPosts,
  getPosts,
  deletePost,
  getPost,
  updatePost,
  getUserPosts,
  getLikedPosts,
} from "../api/postAPI";
import { User } from "../../auth/types";

const addPost = createAsyncThunk(
  "posts/createPost",
  async ({ content, userId }: { content: string; userId: number }) => {
    try {
      const timestamp = Date.now();
      const response = await createPost(content, userId, timestamp);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const editPost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, content }: { id: number; content: string; userId: number }) => {
    const timestamp = Date.now();
    const response = await updatePost(id, content, timestamp);
    return response;
  }
);

const getForYouFeed = createAsyncThunk(
  "posts/getForYouFeed",
  async ({
    byLikes,
    byTimeDesc,
  }: {
    byLikes: boolean;
    byTimeDesc: boolean;
  }) => {
    const response = await getPosts(byLikes, byTimeDesc);
    return response;
  }
);

const getPostById = createAsyncThunk(
  "posts/getPostById",
  async ({ postId }: { postId: number }) => {
    const response = await getPost(postId);
    return response;
  }
);

const getFollowFeed = createAsyncThunk(
  "posts/getFollowFeed",
  async ({
    userId,
    byLikes,
    byTimeDesc,
  }: {
    userId: number;
    byLikes: boolean;
    byTimeDesc: boolean;
  }) => {
    const response = await getFollowedPosts(userId, byLikes, byTimeDesc);
    return response;
  }
);

const destroyPost = createAsyncThunk(
  "posts/destroyPost",
  async ({ postId }: { postId: number }) => {
    const response = await deletePost(postId);
    return response;
  }
);

const getPostsByUserId = createAsyncThunk(
  "posts/getPostsByUserId",
  async ({
    user,
    byLikes,
    byTimeDesc,
  }: {
    user: User;
    byLikes: boolean;
    byTimeDesc: boolean;
  }) => {
    const response = await getUserPosts(user, byLikes, byTimeDesc);
    return response;
  }
);

const getLikedPostsByUserId = createAsyncThunk(
  "posts/getLikedPostsByUserId",
  async ({
    user,
    byLikes,
    byTimeDesc,
  }: {
    user: User;
    byLikes: boolean;
    byTimeDesc: boolean;
  }) => {
    const response = await getLikedPosts(user.id, byLikes, byTimeDesc);
    return response;
  }
);

type PostState = {
  posts: Post[];
  loading: boolean;
  post: Post | null;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  post: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getFollowFeed.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getFollowFeed.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getFollowFeed.rejected, (state) => {
      state.posts = [];
      state.loading = false;
    });
    builder.addCase(getForYouFeed.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getForYouFeed.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getForYouFeed.rejected, (state) => {
      state.posts = [];
      state.loading = false;
    });
    builder.addCase(destroyPost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.meta.arg.postId
      );
      state.loading = false;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPost.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostsByUserId.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getPostsByUserId.rejected, (state) => {
      state.posts = [];
      state.loading = false;
    });
    builder.addCase(getLikedPostsByUserId.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getLikedPostsByUserId.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getLikedPostsByUserId.rejected, (state) => {
      state.posts = [];
      state.loading = false;
    });
  },
});

export {
  addPost,
  getFollowFeed,
  getForYouFeed,
  destroyPost,
  getPostById,
  editPost,
  getPostsByUserId,
  getLikedPostsByUserId,
};
export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
