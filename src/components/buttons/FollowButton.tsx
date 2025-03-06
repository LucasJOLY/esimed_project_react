import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage } from "react-intl";
import { User } from "../../auth/types";
import { followUser, unfollowUser } from "../../profil/store/sliceProfil";

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
  const user = useSelector((state: RootState) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log(actualUser);
    setIsFollowing(actualUser.followers.some((user) => user.id === user?.id));
  }, [actualUser]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowing) {
      dispatch(unfollowUser({ userId: user?.id || 0, followingId: actualUser.id }));
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      dispatch(followUser({ userId: user?.id || 0, followingId: actualUser.id }));
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
