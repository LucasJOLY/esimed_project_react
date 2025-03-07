import React from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import FilterComponent from "../../posts/components/FilterComponent";
import PostCard from "../../posts/components/postCard/PostCard";
import { Post } from "../../posts/type";

interface PostsListProps {
  isDark: boolean;
  posts: Post[];
  byLikes: boolean;
  setByLikes: (value: boolean) => void;
  byTimeDesc: boolean;
  setByTimeDesc: (value: boolean) => void;
  postNumberMessageId: string;
  noPostsMessageId: string;
}

const PostsList: React.FC<PostsListProps> = ({
  isDark,
  posts,
  byLikes,
  setByLikes,
  byTimeDesc,
  setByTimeDesc,
  postNumberMessageId,
  noPostsMessageId,
}) => {
  return (
    <>
      <div className="flex items-center gap-2 justify-between mt-2 mb-2 px-6">
        <Typography variant="h6" className={` ${isDark ? "text-white" : "text-black"}`}>
          <FormattedMessage id={postNumberMessageId} values={{ postNumber: posts.length }} />
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
        <div className="flex justify-center items-center mt-10">
          <Typography>
            <FormattedMessage id={noPostsMessageId} />
          </Typography>
        </div>
      )}
    </>
  );
};

export default PostsList;
