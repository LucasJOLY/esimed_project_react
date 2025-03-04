import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Like } from "../type";

export const createLike = async (
  postId: number,
  userId: number
): Promise<Like> => {
  try {
    const response = await configAPI.post(`/660/likes`, { postId, userId });
    return response.data;
  } catch (error) {
    toast.error("Erreur lors de la création du like");
    throw error;
  }
};

export const deleteLike = async (
  postId: number,
  userId: number
): Promise<Like> => {
  try {
    const response = await configAPI.get(
      `/660/likes?postId=${postId}&userId=${userId}`
    );
    const like: Like = response.data[0];
    await configAPI.delete(`/640/likes/${like.id}`);
    return like;
  } catch (error) {
    toast.error("Erreur lors de la suppression du like");
    throw error;
  }
};
