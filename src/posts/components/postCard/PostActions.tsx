import {
  FaRegComment,
  FaRetweet,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, destroyLike } from "../../store/sliceLikes";
import { addRepost, destroyRepost } from "../../store/sliceReposts";
import { addFavorite, destroyFavorite } from "../../store/sliceFavorites";
import { RootState, AppDispatch } from "../../../app/store";
import { Post } from "../../type";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

interface PostActionsProps {
  post: Post;
  isDark: boolean;
  formattedDate: string;
}

const PostActions = ({ post, isDark, formattedDate }: PostActionsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.authUser?.id);
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeNumbers, setLikeNumbers] = useState(post.likes.length);
  const [repostNumbers, setRepostNumbers] = useState(post.reposts.length);
  const [commentNumbers, setCommentNumbers] = useState(post.comments.length);

  useEffect(() => {
    setIsLiked(post.likes.some((like) => like.userId === userId));
    setLikeNumbers(post.likes.length);
  }, [post.likes]);

  useEffect(() => {
    setIsReposted(post.reposts.some((repost) => repost.userId === userId));
    setRepostNumbers(post.reposts.length);
  }, [post.reposts]);

  useEffect(() => {
    setIsFavorited(post.favorites.some((favorite) => favorite.userId === userId));
  }, [post.favorites]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeNumbers(likeNumbers - 1);
      dispatch(destroyLike({ postId: post.id, userId: userId ?? 0 }));
    } else {
      setLikeNumbers(likeNumbers + 1);
      dispatch(addLike({ post: post, userId: userId ?? 0 }));
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.reposted && post.repostedBy.id !== userId) {
      toast.error(<FormattedMessage id="toast.cannotRepostRepost" />);
      return;
    }
    if (post.user.id === userId) {
      toast.error(<FormattedMessage id="toast.cannotRepostOwnPost" />);
      return;
    }
    if (isReposted) {
      setRepostNumbers(repostNumbers - 1);
      dispatch(destroyRepost({ postId: post.id, userId: userId ?? 0 }));
    } else {
      setRepostNumbers(repostNumbers + 1);
      dispatch(addRepost({ postId: post.id, userId: userId ?? 0 }));
    }
    setIsReposted(!isReposted);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(destroyFavorite({ postId: post.id, userId: userId ?? 0 }));
    } else {
      dispatch(addFavorite({ post: post, userId: userId ?? 0 }));
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex gap-6 mt-3 justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-500 hover:text-[#1d9bf0]">
          <FaRegComment size={20} />
          <span>{commentNumbers}</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
            isReposted ? "text-green-500" : "text-gray-500"
          } ${!post.reposted && post.user.id !== userId ? "hover:text-green-500" : ""}`}
          onClick={handleRepost}
        >
          <FaRetweet size={20} />
          <span>{repostNumbers}</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-red-500 ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleLike}
        >
          {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          <span>{likeNumbers}</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-[#1d9bf0] ${
            isFavorited ? "text-[#1d9bf0]" : "text-gray-500"
          }`}
          onClick={handleFavorite}
        >
          {isFavorited ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
        </div>
      </div>

      <Typography className="text-sm" sx={{ color: isDark ? "#71767b" : "#536471" }}>
        {formattedDate}
      </Typography>
    </div>
  );
};

export default PostActions;
