import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
import SwitchTheme from "./SwitchTheme";
import LanguageSwitch from "./LanguageSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { FormattedMessage } from "react-intl";
import ProfileButton from "./ProfileButton";
import { useState } from "react";

const Header = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const isConnected = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`flex items-center p-2 justify-between sticky top-0 z-50 ${
        isDark
          ? "bg-[#16181c] text-white"
          : "bg-white text-black border-b border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <IconButton
            onClick={handleOpenMenu}
            className={isDark ? "!text-white" : "!text-black"}
          >
            <IoSettingsSharp size={24} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: isDark ? "#16181c" : "white",
              },
            }}
          >
            <MenuItem>
              <SwitchTheme />
            </MenuItem>
            <MenuItem>
              <LanguageSwitch />
            </MenuItem>
          </Menu>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <SwitchTheme />
          <LanguageSwitch />
        </div>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <HiMiniChatBubbleLeftRight size={40} />
        <Typography variant="h4" className="font-bold md:text-2xl">
          <FormattedMessage id="app.title" />
        </Typography>
      </div>

      {isConnected ? <ProfileButton /> : <div></div>}
    </div>
  );
};

export default Header;
