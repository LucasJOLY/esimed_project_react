import { FaRegComment, FaRetweet, FaRegHeart, FaHeart } from "react-icons/fa";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { Comment } from "../../type";
import { addCommentLike, destroyCommentLike } from "../../store/sliceComment";
interface CommentActionsProps {
  comment: Comment;
  isDark: boolean;
  formattedDate: string;
}

const CommentActions = ({ comment, isDark, formattedDate }: CommentActionsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.authUser?.id);
  const [isLiked, setIsLiked] = useState(false);
  const [likeNumbers, setLikeNumbers] = useState(comment.commentLikes.length);

  useEffect(() => {
    setIsLiked(comment.commentLikes.some((like) => like.userId === userId));
    setLikeNumbers(comment.commentLikes.length);
  }, [comment.commentLikes]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeNumbers(likeNumbers - 1);
      dispatch(destroyCommentLike({ commentId: comment.id, userId: userId ?? 0 }));
    } else {
      setLikeNumbers(likeNumbers + 1);
      dispatch(addCommentLike({ commentId: comment.id, userId: userId ?? 0 }));
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex gap-6 mt-3 justify-between">
      <div className="flex items-center gap-6">
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-red-500 ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleLike}
        >
          {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          <span>{likeNumbers}</span>
        </div>
      </div>

      <Typography className="text-sm" sx={{ color: isDark ? "#71767b" : "#536471" }}>
        {formattedDate}
      </Typography>
    </div>
  );
};

export default CommentActions;
