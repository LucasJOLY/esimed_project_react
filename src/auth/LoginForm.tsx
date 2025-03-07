import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useDispatchNavigate from "../hook/useDispatchNavigate";
import { signIn } from "./store/slice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AppDispatch, RootState } from "../app/store";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import CustomTextField from "../components/CustomTextField/CustomTextField";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const handleLogin = async () => {
    if (formCompleted) {
      const result = await dispatch(signIn({ email, password, stayConnected }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
        window.location.reload();
      }
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  const formCompleted = email.length > 0 && password.length > 0;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full px-4}`}>
      <div
        className={`w-full max-w-md p-8 rounded-2xl ${
          isDark ? "bg-[#16181c]" : "bg-white"
        } shadow-xl`}
      >
        <div className="mb-8 text-center">
          <Typography variant="h5" className="font-bold">
            <FormattedMessage id="auth.login" />
          </Typography>
        </div>
        <div className="gap-4 flex flex-col">
          <CustomTextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={<FormattedMessage id="auth.email" />}
            type="text"
            fullWidth
            variant="outlined"
            isDark={isDark}
          />

          <CustomTextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={<FormattedMessage id="auth.password" />}
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            isDark={isDark}
            slotProps={{
              input: {
                endAdornment: (
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                  </div>
                ),
              },
            }}
          />

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            className="h-12 rounded-full font-bold text-lg normal-case"
            sx={{
              backgroundColor: formCompleted ? "#1d9bf0" : "#71767b",
              textTransform: "none",
              "&:hover": {
                backgroundColor: formCompleted ? "#1a8cd8" : "#71767b",
              },
            }}
          >
            <FormattedMessage id="auth.login" />
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={stayConnected}
                onChange={(e) => setStayConnected(e.target.checked)}
                sx={{
                  color: isDark ? "#71767b" : "#536471",
                  "&.Mui-checked": {
                    color: "#1d9bf0",
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: isDark ? "#71767b" : "#536471",
                  fontSize: "0.875rem",
                }}
              >
                <FormattedMessage id="auth.stayConnected" />
              </Typography>
            }
          />
        </div>

        <NavLink
          to="/register"
          end
          className={`block text-center mt-4 text-[#1d9bf0] hover:underline`}
        >
          <FormattedMessage id="auth.notRegistered" />
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
