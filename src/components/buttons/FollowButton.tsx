import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage } from "react-intl";
import { User } from "../../auth/types";
import { followUser, unfollowUser } from "../../profil/store/sliceProfil";

interface FollowButtonProps extends ButtonProps {
  user: User;
  setFollowersCount: (count: number) => void;
  followersCount: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  setFollowersCount,
  followersCount,
  ...props
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const actualUser = useSelector((state: RootState) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(user.following.some((user) => user.id === actualUser?.id));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowing) {
      dispatch(
        unfollowUser({ userId: user.id, myUserId: actualUser?.id || 0 })
      );
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      dispatch(followUser({ userId: user.id, myUserId: actualUser?.id || 0 }));
      setFollowersCount(followersCount + 1);
      setIsFollowing(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
      className="!rounded-full"
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        backgroundColor: isFollowing ? "transparent" : "#1d9bf0",
        color: isFollowing ? (isDark ? "#fff" : "#000") : "#fff",
        border: isFollowing ? `1px solid ${isDark ? "#fff" : "#000"}` : "none",
        "&:hover": {
          backgroundColor: isFollowing ? "rgba(255, 0, 0, 0.1)" : "#1a8cd8",
          border: isFollowing ? "1px solid red" : "none",
          color: isFollowing ? "red" : "#fff",
        },
        ...props.sx,
      }}
    >
      <FormattedMessage
        id={isFollowing ? "followButton.unfollow" : "followButton.follow"}
        defaultMessage={isFollowing ? "Unfollow" : "Follow"}
      />
    </Button>
  );
};

export default FollowButton;
