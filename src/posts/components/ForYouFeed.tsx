import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getForYouFeed } from "../store/slicePost";
import { useNavigate } from "react-router";
import { CircularProgress, Typography } from "@mui/material";
import PostCard from "./postCard/PostCard";
import { FormattedMessage } from "react-intl";
import FilterComponent from "./FilterComponent";

function ForYouFeed() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  // Filtre par popularité (likes) sur les 3 derniers jours
  const [filterByLikes, setFilterByLikes] = useState(false);
  // Filtre par ordre chronologique (croissant ou décroissant)
  const [filterByTime, setFilterByTime] = useState(true);

  const loadPosts = () => {
    dispatch(
      getForYouFeed({
        byLikes: filterByLikes,
        byTimeDesc: filterByTime,
      })
    );
  };

  useEffect(() => {
    loadPosts();
  }, [filterByLikes, filterByTime]);

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
          <Typography>
            <FormattedMessage id="forYouFeed.noPosts" />
          </Typography>
        </div>
      )}
    </div>
  );
}

export default ForYouFeed;
