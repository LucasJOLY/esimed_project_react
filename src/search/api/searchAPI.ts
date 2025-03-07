import { configAPI } from "../../config/apiConfig";
import { Post } from "../../posts/type";
import { toast } from "react-toastify";
import { getIntl } from "../../language/config/translation";
import { User } from "../../auth/types";

export const searchPosts = async (query: string): Promise<Post[]> => {
  try {
    let allPosts: Post[] = [];

    // Si la recherche commence par #, chercher uniquement dans les hashtags
    if (query.startsWith("#")) {
      const hashtagQuery = query.slice(1); // Enlever le # du début
      try {
        const hashtagResponse = await configAPI.get(
          `/660/posts?_embed=likes&_embed=comments&_embed=reposts&_embed=favorites&_expand=user`
        );
        // Filtrer les posts qui contiennent le hashtag
        allPosts = hashtagResponse.data.filter(
          (post: Post) =>
            post.hashtags &&
            post.hashtags.some((tag) => tag.toLowerCase().includes(hashtagQuery.toLowerCase()))
        );
      } catch (error) {
        console.error("Erreur lors de la recherche par hashtag:", error);
        allPosts = [];
      }
    } else {
      // Sinon, chercher dans le contenu et le nom d'utilisateur
      // Recherche par contenu
      const contentResponse = await configAPI.get(
        `/660/posts?content_like=${query}&_embed=likes&_embed=comments&_embed=reposts&_embed=favorites&_expand=user`
      );

      // Recherche par nom d'utilisateur
      const userResponse = await configAPI.get(`/660/users?username_like=${query}`);
      const userIds = userResponse.data.map((user: any) => user.id);

      let userPosts: Post[] = [];
      if (userIds.length > 0) {
        const userPostsResponse = await configAPI.get(
          `/660/posts?${userIds
            .map((id: number) => `userId=${id}`)
            .join("&")}&_embed=likes&_embed=comments&_embed=reposts&_embed=favorites&_expand=user`
        );
        userPosts = userPostsResponse.data;
      }

      allPosts = [...contentResponse.data, ...userPosts];
    }

    // Supprimer les doublons et trier par date
    const uniquePosts = allPosts.filter(
      (post, index, self) => index === self.findIndex((t) => t.id === post.id)
    );
    uniquePosts.sort((a, b) => b.created_at - a.created_at);

    return uniquePosts;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.searchError" }));
    throw error;
  }
};

export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await configAPI.get(`/660/users?username_like=${query}`);
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.searchError" }));
    throw error;
  }
};
