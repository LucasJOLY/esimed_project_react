import { User } from "../auth/type";
type Notification = {
  id: number;
  userId: number;
  senderId: number;
  user: User;
  sender: User;
  route: string;
  created_at: number;
  message: string;
  read: boolean;
};

export type { Notification };
