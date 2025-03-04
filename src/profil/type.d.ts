import { User } from "../auth/type";

type Follow = {
  id: number;
  userId: number;
  followingId: number;
  created_at: number;
  user: User;
};

export type { Follow };
