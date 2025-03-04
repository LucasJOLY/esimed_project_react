import { User } from "../auth/type";
type Like = {
  id: number;
  postId: number;
  userId: number;
};

type Post = {
  id: number;
  user: User;
  content: string;
  userId: number;
  created_at: number;
  likes: Like[];
  comments: Comment[];
  reposts: Repost[];
  reposted: boolean;
  repostedBy: User;
};

type Comment = {
  id: number;
  postId: number;
  userId: number;
  created_at: number;
  content: string;
  user: User;
  commentLikes: CommentLikes[];
};

type CommentLikes = {
  id: number;
  commentId: number;
  userId: number;
  created_at: number;
};

type Repost = {
  id: number;
  postId: number;
  userId: number;
  created_at: number;
  user: User;
};

export type { Post, Like, Comment, Repost, CommentLikes };
