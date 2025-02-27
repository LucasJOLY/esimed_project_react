import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";

export const register = async (username: string, email: string, password: string) => {
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

export const login = async (email: string, password: string) => {
  try {
    const response = await configAPI.post(`login`, {
      email,
      password,
    });
    toast.success("Connexion réussie");
    return response.data;
  } catch (error) {
    toast.error("Erreur lors de la connexion");
    throw error;
  }
};

export const getUser = async (userId : number) => {
  try {
    const response = await configAPI.get(`users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
