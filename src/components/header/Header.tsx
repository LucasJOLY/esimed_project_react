import { IconButton, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import SwitchTheme from "./SwitchTheme";
import LanguageSwitch from "./LanguageSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";

const Header = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const isConnected = useSelector((state: RootState) => state.auth.token);

  return (
    <div className={`flex items-center p-2 justify-between fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-[#16181c] text-white' : 'bg-white text-black border-b border-gray-200'}`}>
      <div className="flex items-center gap-2">
        <SwitchTheme />
        <LanguageSwitch />
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <HiMiniChatBubbleLeftRight size={40} />
        <Typography variant="h4" className="font-bold">
          <FormattedMessage id="app.title" />
        </Typography>
      </div>
      
      {isConnected ? (
        <IconButton
          sx={{
            color: isDark ? "white" : "black"
          }}
        >
          <FaUser />
        </IconButton>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
