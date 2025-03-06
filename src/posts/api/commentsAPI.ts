import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Comment, CommentLikes } from "../type";
import { User } from "../../auth/types";
import { getIntl } from "../../language/config/translation";
import { createNotification } from "../../notifications/api/notificationAPI";

export const createComment = async (
  postId: number,
  user: User,
  content: string,
  created_at: number,
  imageUrl?: string,
  mentions: number[] = []
): Promise<Comment> => {
  try {
    const response = await configAPI.post(`/660/comments`, {
      postId,
      userId: user.id,
      content,
      created_at,
      imageUrl,
      mentions: mentions || [],
    });
    let comment: Comment = response.data;
    comment.user = user;
    comment.commentLikes = [];

    // Créer des notifications pour les mentions
    if (mentions && mentions.length > 0) {
      for (const mentionedUserId of mentions) {
        if (mentionedUserId !== user.id) {
          await createNotification(mentionedUserId, user.id, "mention_comment", postId);
        }
      }
    }

    return comment;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.likeCreationError" }));
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<Comment> => {
  try {
    const response = await configAPI.delete(`/640/comments/${id}`);
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.likeDeletionError" }));
    throw error;
  }
};

export const getCommentsById = async (
  postId: number,
  filterByLikes: boolean,
  filterByTime: boolean
): Promise<Comment[]> => {
  try {
    const response = await configAPI.get(
      `/660/comments?postId=${postId}&_embed=commentLikes&_expand=user&_sort=created_at:desc&_order=desc`
    );
    const comments: Comment[] = response.data;
    if (filterByLikes) {
      comments.sort((a, b) => b.commentLikes.length - a.commentLikes.length);
      return comments;
    }
    if (!filterByTime) {
      comments.sort((a, b) => a.created_at - b.created_at);
      return comments;
    } else {
      comments.sort((a, b) => b.created_at - a.created_at);
      return comments;
    }
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.commentsFetchError" }));
    throw error;
  }
};

export const createCommentLike = async (
  commentId: number,
  userId: number
): Promise<CommentLikes> => {
  try {
    const response = await configAPI.post(`/660/commentLikes`, {
      commentId,
      userId,
    });
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.likeCreationError" }));
    throw error;
  }
};

export const deleteCommentLike = async (
  commentId: number,
  userId: number
): Promise<CommentLikes> => {
  try {
    const response = await configAPI.get(
      `/660/commentLikes?commentId=${commentId}&userId=${userId}`
    );
    const commentLike: CommentLikes = response.data[0];
    await configAPI.delete(`/640/commentLikes/${commentLike.id}`);
    return commentLike;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.likeDeletionError" }));
    throw error;
  }
};
