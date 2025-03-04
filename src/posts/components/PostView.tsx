import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useParams } from "react-router";
import { getPostById } from "../store/slicePost";
import { getCommentsByPostId } from "../store/sliceComment";
import PostCard from "./postCard/PostCard";
import CommentCard from "./commentCard/CommentCard";
import AddComment from "./AddComment";
import { FormattedMessage } from "react-intl";
import { CircularProgress, Typography } from "@mui/material";
import FilterComponent from "./FilterComponent";

function PostView() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.posts.post);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  useEffect(() => {
    dispatch(getPostById({ postId: id ? parseInt(id) : 0 }));
    dispatch(
      getCommentsByPostId({
        postId: id ? parseInt(id) : 0,
        filterByLikes,
        filterByTime,
      })
    );
  }, [id]);

  const [filterByLikes, setFilterByLikes] = useState(false);
  const [filterByTime, setFilterByTime] = useState(true);

  useEffect(() => {
    dispatch(
      getCommentsByPostId({
        postId: id ? parseInt(id) : 0,
        filterByLikes,
        filterByTime,
      })
    );
  }, [filterByLikes, filterByTime]);

  return !post ? (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <PostCard post={post} />
      <AddComment postId={id ? parseInt(id) : 0} />
      <div
        className={`flex justify-between items-center border-t pl-4 pt-2 pb-4 ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <Typography
          variant="h6"
          className={` ${isDark ? "text-white" : "text-black"}`}
        >
          <FormattedMessage
            id="post.comments"
            values={{ count: comments.length }}
          />
        </Typography>
        <FilterComponent
          filterByLikes={filterByLikes}
          filterByTime={filterByTime}
          setFilterByLikes={setFilterByLikes}
          setFilterByTime={setFilterByTime}
        />
      </div>

      <div className="comments-container">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default PostView;
