import { configAPI } from "../../config/apiConfig";
import { Follow } from "../../profil/type";

export const createFollow = async (userId: number, followingId: number): Promise<Follow> => {
  const response = await configAPI.post(`/660/follows`, {
    userId,
    followingId,
  });
  return response.data;
};

export const deleteFollow = async (userId: number, followingId: number): Promise<Follow> => {
  const response = await configAPI.get(`/660/follows?userId=${userId}&followingId=${followingId}`);
  const followId = response.data[0].id;
  const deleteResponse = await configAPI.delete(`/660/follows/${followId}`);
  return deleteResponse.data;
};
