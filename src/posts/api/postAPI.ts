import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Post, Repost, Like } from "../type";
import { Follow } from "../../profil/type";
import { User } from "../../auth/types";
import { getIntl } from "../../language/config/translation";

export const createPost = async (
  content: string,
  userId: number,
  created_at: number,
  imageUrl?: string,
  hashtags: string[] = []
) => {
  const response = await configAPI.post("/660/posts", {
    content,
    userId,
    created_at,
    imageUrl,
    hashtags: hashtags || [],
  });
  return response.data;
};

export const getPost = async (postId: number): Promise<Post> => {
  const response = await configAPI.get(
    `/660/posts/${postId}?_embed=likes&_embed=comments&_embed=reposts&_expand=user`
  );
  response.data.hashtags = response.data.hashtags || [];
  return response.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const response = await configAPI.delete(`/640/posts/${postId}`);
  return response.data;
};

export const updatePost = async (
  id: number,
  content: string,
  created_at: number,
  imageUrl?: string,
  hashtags: string[] = []
) => {
  const response = await configAPI.patch(`/660/posts/${id}`, {
    content,
    created_at,
    imageUrl,
    hashtags: hashtags || [],
  });
  return response.data;
};

export const getUserPosts = async (
  user: User,
  byLikes: boolean,
  byTimeDesc: boolean
): Promise<Post[]> => {
  try {
    const response = await configAPI.get(
      `/660/posts?userId=${user?.id}&_embed=likes&_embed=comments&_embed=reposts&_expand=user`
    );
    const responseRepost = await configAPI.get(`/660/reposts?userId=${user?.id}&_expand=user`);
    const postRepostedIds: number[] = responseRepost.data.map((repost: Repost) => repost.postId);
    const responsePostReposted = await configAPI.get(
      `/660/posts?id=${postRepostedIds.join(
        "&id="
      )}&_embed=likes&_embed=comments&_embed=reposts&_expand=user`
    );
    let repostedPosts: Post[] = [];
    repostedPosts = responsePostReposted.data;

    response.data.forEach((post: Post) => {
      post.hashtags = post.hashtags || [];
    });
    repostedPosts.forEach((post: Post) => {
      post.hashtags = post.hashtags || [];
    });

    repostedPosts.forEach((post: Post) => {
      const repostInfo: Repost = responseRepost.data.find(
        (repost: Repost) => repost.postId === post.id
      );
      if (repostInfo) {
        post.reposted = true;
        post.repostedBy = repostInfo.user;
        post.created_at = repostInfo.created_at;
      }
    });
    const posts: Post[] = [...response.data, ...repostedPosts];
    if (byLikes) {
      return posts.sort((a: Post, b: Post) => b.likes.length - a.likes.length);
    }
    if (byTimeDesc) {
      return posts.sort((a: Post, b: Post) => b.created_at - a.created_at);
    } else {
      return posts.sort((a: Post, b: Post) => a.created_at - b.created_at);
    }
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.postsLoadError" }));
    throw error;
  }
};

export const getPosts = async (byLikes: boolean, byTimeDesc: boolean): Promise<Post[]> => {
  try {
    const response = await configAPI.get(
      "/660/posts?_sort=created_at&_order=desc&_embed=likes&_embed=comments&_embed=reposts&_expand=user"
    );
    const posts: Post[] = response.data;
    if (byLikes) {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return posts
        .filter((post) => new Date(post.created_at) >= threeDaysAgo)
        .sort((a: Post, b: Post) => b.likes.length - a.likes.length);
    }
    if (!byTimeDesc) {
      return posts.sort(
        (a: Post, b: Post) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return posts.sort(
      (a: Post, b: Post) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.postsLoadError" }));
    throw error;
  }
};

export const getLikedPosts = async (
  userId: number,
  byLikes: boolean,
  byTimeDesc: boolean
): Promise<Post[]> => {
  try {
    const likesResponse = await configAPI.get(`/660/likes?userId=${userId}`);
    const postIds: number[] = likesResponse.data.map((like: Like) => like.postId);

    if (postIds.length === 0) return [];

    const postsResponse = await configAPI.get(
      `/660/posts?id=${postIds.join(
        "&id="
      )}&_embed=likes&_embed=comments&_embed=reposts&_expand=user`
    );

    const posts: Post[] = postsResponse.data;
    if (byLikes) {
      return posts.sort((a: Post, b: Post) => b.likes.length - a.likes.length);
    }
    if (byTimeDesc) {
      return posts.sort((a: Post, b: Post) => b.created_at - a.created_at);
    } else {
      return posts.sort((a: Post, b: Post) => a.created_at - b.created_at);
    }
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.likedPostsLoadError" }));
    throw error;
  }
};

export const getFollowedPosts = async (
  userId: number,
  byLikes: boolean,
  byTimeDesc: boolean
): Promise<Post[]> => {
  try {
    const followsResponse = await configAPI.get(`/660/follows?userId=${userId}`);
    const followingIds: number[] = followsResponse.data.map((follow: Follow) => follow.followingId);

    const userIds: number[] = [userId, ...followingIds];
    const postsQuery = `/660/posts?${userIds
      .map((id: number) => `userId=${id}`)
      .join("&")}&_embed=likes&_embed=comments&_embed=reposts&_expand=user`;
    const postsResponse = await configAPI.get(postsQuery);

    const repostsQuery = `/660/reposts?${userIds
      .map((id: number) => `userId=${id}`)
      .join("&")}&_expand=user`;
    const repostsResponse = await configAPI.get(repostsQuery);
    const repostedPostIds: number[] = repostsResponse.data.map((repost: Repost) => repost.postId);

    let repostedPosts: Post[] = [];
    if (repostedPostIds.length > 0) {
      const repostedPostsResponse = await configAPI.get(
        `/660/posts?${repostedPostIds
          .map((id: number) => `id=${id}`)
          .join("&")}&_embed=likes&_embed=comments&_embed=reposts&_expand=user`
      );
      repostedPosts = repostedPostsResponse.data;

      repostedPosts.forEach((post: Post) => {
        const repostInfo: Repost = repostsResponse.data.find(
          (repost: Repost) => repost.postId === post.id
        );
        if (repostInfo) {
          post.reposted = true;
          post.repostedBy = repostInfo.user;
          post.created_at = repostInfo.created_at;
        }
      });
    }

    let allPosts: Post[] = [...postsResponse.data, ...repostedPosts];
    allPosts = allPosts
      .sort((a, b) => (a.reposted ? 1 : -1))
      .filter((post, index, self) => index === self.findIndex((t) => t.id === post.id));
    if (byLikes) {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return allPosts
        .filter((post) => new Date(post.created_at) >= threeDaysAgo)
        .sort((a, b) => b.likes.length - a.likes.length);
    }
    if (byTimeDesc) {
      return allPosts.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      return allPosts.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.followedPostsLoadError" }));
    throw error;
  }
};
