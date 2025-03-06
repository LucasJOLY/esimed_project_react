import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { User } from "../types";
import { AxiosError } from "axios";
import { getIntl } from "../../language/config/translation";
import { Follow } from "../../profil/type";

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
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.registrationError" }));
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await configAPI.post(`login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data === "Incorrect password") {
      toast.error(getIntl("fr").formatMessage({ id: "toast.wrongPassword" }));
    } else if (error instanceof AxiosError && error.response?.data === "Incorrect email") {
      toast.error(getIntl("fr").formatMessage({ id: "toast.wrongEmail" }));
    } else {
      toast.error(getIntl("fr").formatMessage({ id: "toast.loginError" }));
    }
    throw error;
  }
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await configAPI.get(`users/${userId}`);

  const user: User = response.data;
  const followers = await configAPI.get(`follows?followingId=${userId}&_expand=user`);
  const following = await configAPI.get(`follows?userId=${userId}`);
  const followingUsers = await configAPI.get(
    `users?id=${following.data.map((follow: Follow) => follow.followingId).join(",")}`
  );
  user.followers = followers.data;
  let followingList: Follow[] = [];
  following.data.forEach((follow: Follow) => {
    const user = followingUsers.data.find((user: User) => user.id === follow.followingId);
    if (user) {
      let followToAdd = {
        ...follow,
        user: user,
      };
      followingList.push(followToAdd);
    }
  });
  user.following = followingList;

  return user;
};

export const checkEmail = async (email: string): Promise<User> => {
  const response = await configAPI.get(`users?email=${email}`);
  return response.data[0];
};
