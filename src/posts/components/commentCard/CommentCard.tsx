import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router";
import { Comment } from "../../type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { destroyComment } from "../../store/sliceComment";
import DeleteModal from "../../../components/modal/DeleteModal";
import CommentMenu from "./CommentMenu";
import CommentActions from "./CommentActions";
import ExpandableContent from "../../../components/ExpandableContent/ExpandableContent";
import { FormattedMessage } from "react-intl";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const formattedDate = format(new Date(comment.created_at), "dd/MM/yyyy HH:mm", {
    locale: fr,
  });

  // Popover state
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
    setAnchorEl(null);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(destroyComment({ commentId: comment.id }));
    setModalOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${comment.user.id}`);
  };
  return (
    <div
      className={`w-full p-4 border-b cursor-pointer ${
        isDark ? "border-[#333639] hover:bg-[#1d1f23]" : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex gap-3">
        <Avatar sx={{ width: 48, height: 48 }} onClick={handleProfileClick} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 !rounded-full" onClick={handleProfileClick}>
              <Typography className="font-bold" sx={{ color: isDark ? "white" : "black" }}>
                {comment.user.username}
              </Typography>
            </div>

            {comment.userId === userId && (
              <>
                <CommentMenu onDelete={handleDelete} isDark={isDark} />

                <DeleteModal
                  open={modalOpen}
                  onClose={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setModalOpen(false);
                  }}
                  onConfirm={handleConfirmDelete}
                  isDark={isDark}
                  formattedTitle={<FormattedMessage id="comment.deleteConfirmationMessage" />}
                />
              </>
            )}
          </div>

          <div>
            <ExpandableContent content={comment.content} isDark={isDark} />
            {comment.imageUrl && (
              <div className="mt-2">
                <img
                  src={comment.imageUrl}
                  alt="Comment GIF"
                  className="max-w-full rounded-lg"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
            )}
          </div>
          <CommentActions comment={comment} isDark={isDark} formattedDate={formattedDate} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
