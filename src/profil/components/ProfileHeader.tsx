import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import FollowButton from "../../components/buttons/FollowButton";
import { User } from "../../auth/types";

interface ProfileHeaderProps {
  actualUser: User;
  user: User | null;
  isDark: boolean;
  followCount: number;
  followerCount: number;
  handleClickFollowing: (event: React.MouseEvent<HTMLElement>) => void;
  handleClickFollowers: (event: React.MouseEvent<HTMLElement>) => void;
  setFollowerCount: (count: number) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  actualUser,
  user,
  isDark,
  followCount,
  followerCount,
  handleClickFollowing,
  handleClickFollowers,
  setFollowerCount,
}) => {
  return (
    <div
      className={`relative w-full border-b ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className={`h-34 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
      <div className="px-6">
        <div className="relative -top-10">
          <Avatar
            sx={{
              width: 110,
              height: 110,
              border: "4px solid",
              borderColor: isDark ? "#16181c" : "white",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="text-left flex items-center gap-2 justify-between relative -top-6">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              color: isDark ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {actualUser?.username}
          </Typography>
          {actualUser?.id !== user?.id && (
            <FollowButton
              user={actualUser}
              setFollowersCount={setFollowerCount}
              followersCount={followerCount}
              sx={{
                width: "100px",
              }}
            />
          )}
        </div>

        <div className="flex gap-6 mb-3">
          <Button
            className="hover:bg-transparent"
            sx={{
              padding: 0,
              minWidth: "auto",
              color: isDark ? "#fff" : "#000",
            }}
            onClick={handleClickFollowing}
          >
            <span className="font-bold mr-1">{followCount}</span>
            <FormattedMessage id="follow" />
          </Button>

          <Button
            className="hover:bg-transparent"
            sx={{
              padding: 0,
              minWidth: "auto",
              color: isDark ? "#fff" : "#000",
            }}
            onClick={handleClickFollowers}
          >
            <span className="font-bold mr-1">{followerCount}</span>
            <FormattedMessage id="followers" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
