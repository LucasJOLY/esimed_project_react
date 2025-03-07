import React from "react";
import { User } from "../../auth/types";
import { Post } from "../../posts/type";
import ProfileTabs from "./ProfileTabs";
import PostsList from "./PostsList";

interface ProfilePostsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  isDark: boolean;
  posts: Post[];
  byLikes: boolean;
  setByLikes: (value: boolean) => void;
  byTimeDesc: boolean;
  setByTimeDesc: (value: boolean) => void;
  showFavoritesTab?: boolean;
  authUser: User;
  currentUser: User;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({
  value,
  handleChange,
  isDark,
  posts,
  byLikes,
  setByLikes,
  byTimeDesc,
  setByTimeDesc,
  showFavoritesTab = false,
  authUser,
  currentUser,
}) => {
  return (
    <div>
      <ProfileTabs
        value={value}
        handleChange={handleChange}
        isDark={isDark}
        showFavoritesTab={showFavoritesTab}
        authUser={authUser}
        currentUser={currentUser}
      />

      {value === 0 && (
        <PostsList
          isDark={isDark}
          posts={posts}
          byLikes={byLikes}
          setByLikes={setByLikes}
          byTimeDesc={byTimeDesc}
          setByTimeDesc={setByTimeDesc}
          postNumberMessageId="post_number"
          noPostsMessageId="no_posts"
        />
      )}
      {value === 1 && (
        <PostsList
          isDark={isDark}
          posts={posts}
          byLikes={byLikes}
          setByLikes={setByLikes}
          byTimeDesc={byTimeDesc}
          setByTimeDesc={setByTimeDesc}
          postNumberMessageId="post_number_liked"
          noPostsMessageId="no_posts"
        />
      )}
      {value === 2 && showFavoritesTab && (
        <PostsList
          isDark={isDark}
          posts={posts}
          byLikes={byLikes}
          setByLikes={setByLikes}
          byTimeDesc={byTimeDesc}
          setByTimeDesc={setByTimeDesc}
          postNumberMessageId="post_number_favorites"
          noPostsMessageId="no_favorites"
        />
      )}
    </div>
  );
};

export default ProfilePosts;
