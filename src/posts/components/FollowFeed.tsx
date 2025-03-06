import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearPosts, getFollowFeed } from "../store/slicePost";
import { CircularProgress } from "@mui/material";
import PostCard from "./postCard/PostCard";
import FilterComponent from "./FilterComponent";
import { FormattedMessage } from "react-intl";

function FollowFeed() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const loadingRepost = useSelector((state: RootState) => state.reposts.repostLoading);

  const [filterByLikes, setFilterByLikes] = useState(false);
  const [filterByTime, setFilterByTime] = useState(true);

  const loadPosts = () => {
    dispatch(
      getFollowFeed({
        userId: user?.id || 0,
        byLikes: filterByLikes,
        byTimeDesc: filterByTime,
      })
    );
  };

  useEffect(() => {
    if (loadingRepost === "succeeded") {
      loadPosts();
    }
  }, [loadingRepost]);

  useEffect(() => {
    loadPosts();
  }, [filterByLikes, filterByTime]);

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : posts.length > 0 ? (
        <div>
          <FilterComponent
            filterByLikes={filterByLikes}
            filterByTime={filterByTime}
            setFilterByLikes={setFilterByLikes}
            setFilterByTime={setFilterByTime}
          />
          <div className="flex flex-col">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <FormattedMessage id="forYouFeed.noPosts" />
        </div>
      )}
    </div>
  );
}

export default FollowFeed;
