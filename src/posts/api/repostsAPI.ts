import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Repost } from "../type";

export const createRepost = async (
  postId: number,
  userId: number,
  created_at: number
): Promise<Repost> => {
  try {
    const response = await configAPI.post(`/660/reposts`, {
      postId,
      userId,
      created_at,
    });
    return response.data;
  } catch (error) {
    toast.error("Erreur lors de la création du repost");
    throw error;
  }
};

export const deleteRepost = async (
  postId: number,
  userId: number
): Promise<Repost> => {
  try {
    const response = await configAPI.get(
      `/660/reposts?postId=${postId}&userId=${userId}`
    );
    if (response.data.length > 0) {
      await configAPI.delete(`/640/reposts/${response.data[0].id}`);
    }
    return response.data;
  } catch (error) {
    toast.error("Erreur lors de la suppression du repost");
    throw error;
  }
};
