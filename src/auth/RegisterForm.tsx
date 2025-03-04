import { Button, TextField, Typography, LinearProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import useDispatchNavigate from "../hook/useDispatchNavigate";
import { signUp } from "./store/slice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import {
  calculatePasswordStrength,
  checkPassword,
  isEmailAlreadyUsed,
} from "./service";

const RegisterForm: React.FC = () => {
  const dispatchNavigate = useDispatchNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState(false);

  useEffect(() => {
    setIsSamePassword(password === confirmPassword);
  }, [password, confirmPassword]);

  const passwordStrength = calculatePasswordStrength(password);

  const handleRegister = async () => {
    if (checkForm()) {
      await isEmailAlreadyUsed(email);
      checkPassword(password);
      dispatchNavigate(signUp({ username, email, password }), "/");
    } else {
      toast.error(<FormattedMessage id="auth.fillAllFields" />);
    }
  };

  const checkForm = () => {
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      isSamePassword
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full px-4`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl ${
          isDark ? "bg-[#16181c]" : "bg-white"
        } shadow-xl`}
      >
        <div className="mb-8 text-center">
          <Typography variant="h5" className="font-bold">
            <FormattedMessage id="auth.register" />
          </Typography>
        </div>
        <div className="gap-4 flex flex-col">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={<FormattedMessage id="auth.username" />}
            type="text"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: isDark ? "#202327" : "#f7f9f9",
                "&:hover fieldset": {
                  borderColor: "#1d9bf0",
                },
                "& fieldset": {
                  borderColor: isDark ? "#333639" : "#cfd9de",
                },
              },
              "& .MuiInputLabel-root": {
                color: isDark ? "#71767b" : "#536471",
              },
              "& input": {
                color: isDark ? "white" : "black",
              },
            }}
          />

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={<FormattedMessage id="auth.email" />}
            type="email"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: isDark ? "#202327" : "#f7f9f9",
                "&:hover fieldset": {
                  borderColor: "#1d9bf0",
                },
                "& fieldset": {
                  borderColor: isDark ? "#333639" : "#cfd9de",
                },
              },
              "& .MuiInputLabel-root": {
                color: isDark ? "#71767b" : "#536471",
              },
              "& input": {
                color: isDark ? "white" : "black",
              },
            }}
          />

          <div>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={<FormattedMessage id="auth.password" />}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <AiFillEye size={20} />
                      ) : (
                        <AiFillEyeInvisible size={20} />
                      )}
                    </div>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? "#202327" : "#f7f9f9",
                  "&:hover fieldset": {
                    borderColor: "#1d9bf0",
                  },
                  "& fieldset": {
                    borderColor: isDark ? "#333639" : "#cfd9de",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDark ? "#71767b" : "#536471",
                },
                "& input": {
                  color: isDark ? "white" : "black",
                },
              }}
            />
            {password && (
              <div className="mt-2">
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength.score}
                  sx={{
                    backgroundColor: isDark ? "#333639" : "#cfd9de",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: passwordStrength.color,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  style={{ color: passwordStrength.color }}
                >
                  <FormattedMessage
                    id="auth.passwordStrength.label"
                    values={{
                      strength: (
                        <FormattedMessage
                          id={`auth.passwordStrength.${passwordStrength.label}`}
                        />
                      ),
                    }}
                  />
                </Typography>
              </div>
            )}
          </div>

          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label={<FormattedMessage id="auth.confirmPassword" />}
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </div>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: isDark ? "#202327" : "#f7f9f9",
                "&:hover fieldset": {
                  borderColor: "#1d9bf0",
                },
                "& fieldset": {
                  borderColor: isDark ? "#333639" : "#cfd9de",
                },
              },
              "& .MuiInputLabel-root": {
                color: isDark ? "#71767b" : "#536471",
              },
              "& input": {
                color: isDark ? "white" : "black",
              },
            }}
          />
          {!isSamePassword && (
            <Typography variant="caption" style={{ color: "#f44336" }}>
              <FormattedMessage id="auth.passwordNotMatch" />
            </Typography>
          )}

          <Button
            onClick={handleRegister}
            variant="contained"
            fullWidth
            className="h-12 rounded-full font-bold text-lg normal-case"
            sx={{
              backgroundColor: checkForm() ? "#1d9bf0" : "#808080",
              textTransform: "none",
              "&:hover": {
                backgroundColor: checkForm() ? "#1a8cd8" : "#808080",
              },
            }}
          >
            <FormattedMessage id="auth.register" />
          </Button>
        </div>

        <NavLink
          to="/login"
          end
          className={`block text-center mt-4 text-[#1d9bf0] hover:underline`}
        >
          <FormattedMessage id="auth.alreadyRegistered" />
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterForm;
