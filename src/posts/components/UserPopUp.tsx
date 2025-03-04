import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getUserById } from "../../auth/store/slice";
import { User } from "../../auth/types";
import {
  Avatar,
  Button,
  CircularProgress,
  Popover,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import FollowButton from "../../components/buttons/FollowButton";

function UserPopUp({ user }: { user: User }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userById = useSelector((state: RootState) => state.auth.userById);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    dispatch(getUserById(user.id));
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const [followCount, setFollowCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    setFollowCount(userById?.following?.length || 0);
    setFollowerCount(userById?.followers?.length || 0);
  }, [userById]);

  const goToProfile = () => {
    navigate(`/profile/${userById?.id}`);
  };

  return (
    <Fragment>
      <Avatar
        component="button"
        sx={{ width: 48, height: 48 }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {!userById ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={`p-2 flex flex-col items-start ${
              isDark ? "bg-[#16181c] text-white" : "bg-white text-black"
            }`}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="relative w-[300px]">
              <div
                className={`h-24 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
              ></div>
              <div className="px-4">
                <div className="relative -top-6">
                  <Avatar
                    onClick={(event) => {
                      event.stopPropagation();
                      goToProfile();
                    }}
                    sx={{
                      width: 72,
                      height: 72,
                      border: "4px solid",
                      borderColor: isDark ? "#16181c" : "white",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div className="text-left flex items-center gap-2 justify-between relative -top-5">
                  <Typography
                    onClick={(event) => {
                      event.stopPropagation();
                      goToProfile();
                    }}
                    sx={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: isDark ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {userById?.username}
                  </Typography>
                  {userById?.id !== user.id && (
                    <FollowButton
                      user={userById}
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
                  >
                    <span className="font-bold mr-1">{followerCount}</span>
                    <FormattedMessage id="followers" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popover>
    </Fragment>
  );
}

export default UserPopUp;
