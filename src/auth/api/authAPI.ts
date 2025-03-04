import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { User } from "../types";
import { AxiosError } from "axios";
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await configAPI.post(`register`, {
      username,
      email,
      password,
    });

    toast.success("Inscription réussie");
    return response.data;
  } catch (error) {
    toast.error("Erreur lors de l'inscription");
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await configAPI.post(`login`, {
      email,
      password,
    });
    toast.success("Connexion réussie");
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data === "Incorrect password"
    ) {
      toast.error("Mot de passe incorrect");
    } else if (
      error instanceof AxiosError &&
      error.response?.data === "Incorrect email"
    ) {
      toast.error("Email incorrect");
    } else {
      toast.error("Erreur lors de la connexion");
    }
    throw error;
  }
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await configAPI.get(`users/${userId}`);

  const user: User = response.data;
  const followers = await configAPI.get(`follow?userId=${userId}&_expand=user`);
  const following = await configAPI.get(
    `follow?followingId=${userId}&_expand=user`
  );
  user.followers = followers.data;
  user.following = following.data;
  return user;
};

export const checkEmail = async (email: string): Promise<User> => {
  const response = await configAPI.get(`users?email=${email}`);
  return response.data[0];
};
