import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { FormattedMessage } from "react-intl";
export const Home = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full px-4`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl ${
          isDark ? "bg-[#16181c]" : "bg-white"
        } shadow-xl`}
      >
        <div className="flex flex-col items-center gap-4 mb-8">
          <HiMiniChatBubbleLeftRight size={80} />
          <Typography variant="h3" className="font-bold text-center">
            <FormattedMessage id="app.title" />
          </Typography>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            fullWidth
            className="h-12 rounded-full font-bold text-lg normal-case"
            sx={{
              backgroundColor: "#1d9bf0",
              "&:hover": {
                backgroundColor: "#1a8cd8",
              },
            }}
            onClick={() => navigate("/login")}
          >
            <FormattedMessage id="auth.login" />
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="h-12 rounded-full font-bold text-lg normal-case"
            sx={{
              borderColor: "#1d9bf0",
              color: "#1d9bf0",
              "&:hover": {
                borderColor: "#1a8cd8",
                backgroundColor: "rgba(29, 155, 240, 0.1)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            <FormattedMessage id="auth.register" />
          </Button>
        </div>
      </div>
    </div>
  );
};
