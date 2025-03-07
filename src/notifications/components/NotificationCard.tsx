import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Typography, IconButton } from "@mui/material";
import { Notification } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { markNotificationAsRead, removeNotification } from "../store/sliceNotifications";
import { AppDispatch, RootState } from "../../app/store";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FormattedMessage } from "react-intl";
import { FaBookmark, FaTrash, FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import UserPopUp from "../../components/UserPopUp";
import { useSwipeable } from "react-swipeable";

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (e.dir === "Left" && e.deltaX >= -100) {
        setSwipeOffset(e.deltaX);
        setIsSwiping(true);
      }
    },
    onSwipedLeft: () => {
      if (swipeOffset < -50) {
        setSwipeOffset(-100);
      } else {
        setSwipeOffset(0);
      }
      setIsSwiping(false);
    },
    onSwipedRight: () => {
      setSwipeOffset(0);
      setIsSwiping(false);
    },
    trackMouse: false,
    trackTouch: true,
  });

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "follow":
        return <FaUserPlus size={24} className="text-[#1DA1F2]" />;
      case "like":
        return <FaHeart size={24} className="text-red-500" />;
      case "comment":
        return <FaComment size={24} className="text-[#1DA1F2]" />;
      case "mention":
        return <FaUser size={24} className="text-[#1DA1F2]" />;
      case "mention_comment":
        return <FaComment size={24} className="text-[#1DA1F2]" />;
      case "favorite":
        return <FaBookmark size={24} className="text-[#1DA1F2]" />;
      default:
        return null;
    }
  };

  const getNotificationMessageId = () => {
    switch (notification.type) {
      case "follow":
        return "notifications.followMessage";
      case "like":
        return "notifications.likeMessage";
      case "comment":
        return "notifications.commentMessage";
      case "mention_comment":
        return "notifications.mentionCommentMessage";
      case "mention":
        return "notifications.mentionMessage";
      case "favorite":
        return "notifications.favoriteMessage";
      default:
        return "notifications.defaultMessage";
    }
  };

  const handleClick = () => {
    dispatch(markNotificationAsRead(notification));
    switch (notification.type) {
      case "follow":
        navigate(`/profile/${notification.senderId}`);
        break;
      case "like":
      case "comment":
      case "mention_comment":
      case "mention":
        navigate(`/feed/${notification.postId}`);
        break;
      case "favorite":
        navigate(`/feed/${notification.postId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        {...handlers}
        onClick={!isSwiping ? handleClick : undefined}
        className={`w-full p-4 border-b relative transition-transform ${
          isDark ? "border-[#333639] hover:bg-[#1d1f23]" : "border-gray-200 hover:bg-[#f5f5f5]"
        }`}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease-out",
        }}
      >
        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              {getNotificationIcon()}
              <UserPopUp userId={notification.senderId} />
            </div>
            <div className="flex-1">
              <Typography className="font-bold" sx={{ color: isDark ? "white" : "black" }}>
                {notification.sender.username}
              </Typography>
              <Typography sx={{ color: isDark ? "white" : "black" }}>
                <FormattedMessage id={getNotificationMessageId()} />
              </Typography>
            </div>
          </div>
          <div className="hidden md:flex gap-1">
            {!notification.read ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(markNotificationAsRead(notification));
                }}
              >
                <MdOutlineMarkEmailUnread size={30} className="mr-1 text-[#1DA1F2]" />
              </IconButton>
            ) : (
              <IconButton>
                <MdOutlineMarkEmailRead size={30} className="mr-1 text-[#1DA1F2]" />
              </IconButton>
            )}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeNotification({ notificationId: notification.id }));
              }}
            >
              <FaTrash size={20} className="mr-1 text-red-500" />
            </IconButton>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 h-full flex items-center md:hidden"
        style={{
          transform: `translateX(${swipeOffset + 100}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease-out",
        }}
      >
        {!notification.read ? (
          <IconButton
            className="h-full !rounded-none px-3 !bg-[#1DA1F2]"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(markNotificationAsRead(notification));
            }}
          >
            <MdOutlineMarkEmailUnread size={30} className="text-white" />
          </IconButton>
        ) : (
          <IconButton className="h-full !rounded-none px-3 !bg-[#1DA1F2]">
            <MdOutlineMarkEmailRead size={30} className="text-white" />
          </IconButton>
        )}
        <IconButton
          className="h-full !rounded-none px-3 !bg-red-500"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeNotification({ notificationId: notification.id }));
          }}
        >
          <FaTrash size={25} className="text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default NotificationCard;
