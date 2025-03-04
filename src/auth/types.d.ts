import { Follow } from "../profil/type";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  followers: Follow[];
  following: Follow[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  userById: User | null;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export type { User, AuthState, PasswordStrength };
