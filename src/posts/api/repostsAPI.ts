import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Repost } from "../type";
import { getIntl } from "../../language/config/translation";

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
    toast.error(getIntl("fr").formatMessage({ id: "toast.repostCreationError" }));
    throw error;
  }
};

export const deleteRepost = async (postId: number, userId: number): Promise<Repost> => {
  try {
    const response = await configAPI.get(`/660/reposts?postId=${postId}&userId=${userId}`);
    if (response.data.length > 0) {
      await configAPI.delete(`/640/reposts/${response.data[0].id}`);
    }
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.repostDeletionError" }));
    throw error;
  }
};
