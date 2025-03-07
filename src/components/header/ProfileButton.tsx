import { Avatar, Button, IconButton, Popover, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { logOut } from "../../auth/store/slice";
import useDispatchNavigate from "../../hook/useDispatchNavigate";
import { FormattedMessage } from "react-intl";

const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const navigate = useNavigate();
  const dispatchNavigate = useDispatchNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatchNavigate(logOut(), "/login");
    navigate("/");
    handleClose();
  };

  const handleProfile = () => {
    navigate(`/profile`);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        <IconButton
          onClick={handleClick}
          sx={{
            color: isDark ? "white" : "black",
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </IconButton>
      </div>

      {/* Desktop view */}
      <div
        className="hidden md:flex items-center gap-2 px-2 py-2 rounded-full cursor-pointer"
        style={{
          backgroundColor: isDark ? "#16181c" : "#f7f9f9",
          border: `1px solid ${isDark ? "#333639" : "#cfd9de"}`,
        }}
      >
        <div className="flex items-center gap-3">
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          <Typography sx={{ color: isDark ? "white" : "black" }}>{authUser?.username}</Typography>
        </div>
        <IconButton
          onClick={handleClick}
          sx={{
            color: isDark ? "white" : "black",
            padding: "4px",
          }}
        >
          <BsThreeDots />
        </IconButton>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={`p-2 flex flex-col items-start ${isDark ? "bg-[#16181c]" : "bg-white"}`}>
          <Button
            onClick={handleProfile}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 2,
              width: "100%",
              color: isDark ? "white" : "#1d9bf0",
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
            }}
          >
            <FaUser />
            <Typography>
              <FormattedMessage id="auth.profile" />
            </Typography>
          </Button>
          <Button
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 2,
              width: "100%",
              color: "#ff0000",
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
            }}
          >
            <IoLogOutOutline />
            <Typography>
              <FormattedMessage id="auth.logout" />
            </Typography>
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default ProfileButton;
