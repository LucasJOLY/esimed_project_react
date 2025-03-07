import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage } from "react-intl";
import { User } from "../../auth/types";
import { followUser, unfollowUser } from "../../profil/store/sliceProfil";
import { Follow } from "../../profil/type";
interface FollowButtonProps extends ButtonProps {
  actualUser: User;
  setFollowersCount: (count: number) => void;
  followersCount: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  actualUser,
  setFollowersCount,
  followersCount,
  ...props
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(
      actualUser.followers.some((followUser: Follow) => followUser.user.id === authUser?.id)
    );
  }, [actualUser]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowing) {
      dispatch(unfollowUser({ userId: authUser?.id || 0, followingId: actualUser.id }));
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      dispatch(followUser({ userId: authUser?.id || 0, followingId: actualUser.id }));
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
        color: isFollowing ? "red" : "#fff",
        border: isFollowing ? `1px solid red` : "none",
        "&:hover": {
          backgroundColor: isFollowing ? "transparent" : "#1a8cd8",
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
