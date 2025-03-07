import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Favorite, Post } from "../type";
import { getIntl } from "../../language/config/translation";

export const createFavorite = async (postId: number, userId: number): Promise<Favorite> => {
  try {
    const response = await configAPI.post(`/660/favorites`, { postId, userId });
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.favoriteCreationError" }));
    throw error;
  }
};

export const deleteFavorite = async (postId: number, userId: number): Promise<Favorite> => {
  try {
    const response = await configAPI.get(`/660/favorites?postId=${postId}&userId=${userId}`);
    const favorite: Favorite = response.data[0];
    await configAPI.delete(`/640/favorites/${favorite.id}`);
    return favorite;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.favoriteDeletionError" }));
    throw error;
  }
};

export const getFavoritesByUserId = async (
  userId: number,
  byLikes: boolean,
  byTimeDesc: boolean
): Promise<Favorite[]> => {
  try {
    const response = await configAPI.get(`/660/favorites?userId=${userId}&_expand=post`);
    const postIds = response.data.map((favorite: Favorite) => favorite.postId);
    const posts = await configAPI.get(
      `/660/posts?id=${postIds.join(
        "&id="
      )}&_expand=user&_embed=likes&_embed=comments&_embed=reposts&_embed=favorites`
    );
    const postsData = posts.data;
    const finalFavorites: Favorite[] = response.data.map((favorite: Favorite) => {
      const post = postsData.find((post: Post) => post.id === favorite.postId);
      return { ...favorite, post };
    });
    if (byLikes) {
      return finalFavorites.sort((a, b) => b.post.likes.length - a.post.likes.length);
    }
    if (byTimeDesc) {
      return finalFavorites.sort((a, b) => b.post.created_at - a.post.created_at);
    } else {
      return finalFavorites.sort((a, b) => a.post.created_at - b.post.created_at);
    }
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.favoritesFetchError" }));
    throw error;
  }
};
