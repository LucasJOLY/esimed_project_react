import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { useNavigate } from "react-router";
import { Post } from "../../type";
import { FaRetweet } from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FormattedMessage } from "react-intl";
import { Fragment, useState } from "react";
import { destroyPost } from "../../store/slicePost";
import PostMenu from "./PostMenu";
import DeleteModal from "../../../components/modal/DeleteModal";
import PostActions from "./PostActions";
import UserPopUp from "../../../components/UserPopUp";
import ExpandableContent from "../../../components/ExpandableContent/ExpandableContent";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.authUser?.id);
  const formattedDate = format(new Date(post.created_at), "dd/MM/yyyy HH:mm", {
    locale: fr,
  });

  // Popover state
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/feed/edit-post/${post.id}`);
    setAnchorEl(null);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
    setAnchorEl(null);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(destroyPost({ postId: post.id }));
    if (window.location.pathname.includes("/feed/")) {
      navigate("/");
    }
    setModalOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${post.user.id}`);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/feed/${post.id}`);
      }}
      className={`w-full p-4 border-b cursor-pointer ${
        isDark ? "border-[#333639] hover:bg-[#1d1f23]" : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      {post.reposted && (
        <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
          <FaRetweet size={20} />
          <Typography>
            <FormattedMessage
              id="post.reposted"
              values={{
                username:
                  post.repostedBy.id === userId ? (
                    <FormattedMessage id="post.you" />
                  ) : (
                    post.repostedBy.username
                  ),
              }}
            />
          </Typography>
        </div>
      )}

      <div className="flex gap-3">
        <UserPopUp userId={post.user.id} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 !rounded-full" onClick={handleProfileClick}>
              <Typography className="font-bold" sx={{ color: isDark ? "white" : "black" }}>
                {post.user.username}
              </Typography>
            </div>

            {post.userId === userId && (
              <Fragment>
                <PostMenu onEdit={handleEdit} onDelete={handleDelete} isDark={isDark} />
                <DeleteModal
                  open={modalOpen}
                  onClose={closeModal}
                  onConfirm={handleConfirmDelete}
                  isDark={isDark}
                  formattedTitle={<FormattedMessage id="post.deleteConfirmationMessage" />}
                />
              </Fragment>
            )}
          </div>

          <div>
            <ExpandableContent content={post.content} isDark={isDark} />
            {post.imageUrl && (
              <div className="mt-2">
                <img
                  src={post.imageUrl}
                  alt="Post GIF"
                  className="max-w-full rounded-lg"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
            )}
          </div>
          <PostActions post={post} isDark={isDark} formattedDate={formattedDate} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
