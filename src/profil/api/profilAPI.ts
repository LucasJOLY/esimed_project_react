import { configAPI } from "../../config/apiConfig";
import { Follow } from "../../profil/type";

export const createFollow = async (
  userId: number,
  myUserId: number
): Promise<Follow> => {
  const response = await configAPI.post(`/660/follow`, {
    userId,
    myUserId,
  });
  return response.data;
};

export const deleteFollow = async (
  userId: number,
  myUserId: number
): Promise<Follow> => {
  const response = await configAPI.get(
    `/660/follow?userId=${myUserId}&followingId=${userId}`
  );
  const followId = response.data[0].id;
  const deleteResponse = await configAPI.delete(`/660/follow/${followId}`);
  return deleteResponse.data;
};
