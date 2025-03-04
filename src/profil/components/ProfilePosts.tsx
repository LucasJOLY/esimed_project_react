import React from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import FilterComponent from "../../posts/components/FilterComponent";
import PostCard from "../../posts/components/postCard/PostCard";
import { Post } from "../../posts/type";

interface ProfilePostsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  isDark: boolean;
  posts: Post[];
  byLikes: boolean;
  setByLikes: (value: boolean) => void;
  byTimeDesc: boolean;
  setByTimeDesc: (value: boolean) => void;
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
}) => {
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
      >
        <Tab
          label={<FormattedMessage id="feed.myPosts" />}
          sx={{
            color: isDark ? "white" : "black",
            "&.Mui-selected": {
              color: "#1d9bf0",
            },
          }}
        />
        <Tab
          label={<FormattedMessage id="feed.likedPosts" />}
          sx={{ color: isDark ? "white" : "black" }}
        />
      </Tabs>

      {value === 0 && (
        <>
          <div className="flex items-center gap-2 justify-between mt-2 mb-2 px-6">
            <Typography
              variant="h6"
              className={` ${isDark ? "text-white" : "text-black"}`}
            >
              <FormattedMessage
                id="post_number"
                values={{ postNumber: posts.length }}
              />
            </Typography>
            <FilterComponent
              filterByLikes={byLikes}
              setFilterByLikes={setByLikes}
              filterByTime={byTimeDesc}
              setFilterByTime={setByTimeDesc}
            />
          </div>
          {posts && posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Typography>
              <FormattedMessage id="no_posts" />
            </Typography>
          )}
        </>
      )}
      {value === 1 && (
        <>
          <div className="flex items-center gap-2 justify-between mt-2 mb-2 px-6">
            <Typography
              variant="h6"
              className={` ${isDark ? "text-white" : "text-black"}`}
            >
              <FormattedMessage
                id="post_number_liked"
                values={{ postNumber: posts.length }}
              />
            </Typography>
            <FilterComponent
              filterByLikes={byLikes}
              setFilterByLikes={setByLikes}
              filterByTime={byTimeDesc}
              setFilterByTime={setByTimeDesc}
            />
          </div>
          {posts && posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Typography>
              <FormattedMessage id="no_posts" />
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePosts;
