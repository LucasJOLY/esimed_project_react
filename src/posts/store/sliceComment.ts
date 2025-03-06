import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComment,
  createCommentLike,
  deleteComment,
  deleteCommentLike,
  getCommentsById,
} from "../api/commentsAPI";
import { Comment } from "../type";
import { User } from "../../auth/types";
import { isContentValid, isNotEmpty } from "../components/service/createService";
import { toast } from "react-toastify";
import { getIntl } from "../../language/config/translation";
import { createNotification } from "../../notifications/api/notificationAPI";
import { getPost } from "../api/postAPI";

const addComment = createAsyncThunk(
  "comments/addComment",
  async (
    {
      postId,
      user,
      content,
      imageUrl,
      mentions,
    }: {
      postId: number;
      user: User;
      content: string;
      imageUrl?: string;
      mentions?: number[];
    },
    { rejectWithValue }
  ) => {
    try {
      if (!isContentValid(content)) {
        toast.error(getIntl("fr").formatMessage({ id: "toast.contentTooLong" }));
        return rejectWithValue("Content is too long");
      }
      if (!isNotEmpty(content)) {
        toast.error(getIntl("fr").formatMessage({ id: "toast.contentEmpty" }));
        return rejectWithValue("Content is empty");
      }
      const timestamp = Date.now();
      const response = await createComment(postId, user, content, timestamp, imageUrl, mentions);

      const post = await getPost(postId);
      if (post.userId !== user.id) {
        await createNotification(post.userId, user.id, "comment", postId);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const destroyComment = createAsyncThunk(
  "comments/destroyComment",
  async ({ commentId }: { commentId: number }) => {
    const response = await deleteComment(commentId);
    return response;
  }
);

const getCommentsByPostId = createAsyncThunk(
  "comments/getComments",
  async ({
    postId,
    filterByLikes,
    filterByTime,
  }: {
    postId: number;
    filterByLikes: boolean;
    filterByTime: boolean;
  }) => {
    const response = await getCommentsById(postId, filterByLikes, filterByTime);
    return response;
  }
);

const addCommentLike = createAsyncThunk(
  "comments/addCommentLike",
  async ({ commentId, userId }: { commentId: number; userId: number }) => {
    const response = await createCommentLike(commentId, userId);
    return response;
  }
);

const destroyCommentLike = createAsyncThunk(
  "comments/destroyCommentLike",
  async ({ commentId, userId }: { commentId: number; userId: number }) => {
    const response = await deleteCommentLike(commentId, userId);
    return response;
  }
);

type CommentSate = {
  loading: boolean;
  comments: Comment[];
};

const initialState: CommentSate = {
  loading: false,
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(destroyComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(destroyComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.meta.arg.commentId);
      state.loading = false;
    });
    builder.addCase(destroyComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getCommentsByPostId.pending, (state) => {
      state.comments = [];
      state.loading = true;
    });
    builder.addCase(getCommentsByPostId.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(getCommentsByPostId.rejected, (state) => {
      state.comments = [];
      state.loading = false;
    });
  },
});

export { addComment, destroyComment, getCommentsByPostId, addCommentLike, destroyCommentLike };
export default commentSlice.reducer;
