import { User } from "../auth/type";
type Notification = {
  id: number;
  userId: number;
  senderId: number;
  type: string;
  user: User;
  sender: User;
  postId: number;
  created_at: number;
  read: boolean;
};

export type { Notification };
