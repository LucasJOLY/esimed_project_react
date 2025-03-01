import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import useDispatchNavigate from "../hook/useDispatchNavigate";
import { signIn } from "./store/slice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RootState } from "../app/store";
import { FormattedMessage } from "react-intl";
const LoginForm: React.FC = () => {
  const dispatchNavigate = useDispatchNavigate();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await dispatchNavigate(signIn({ email, password }), "/courses");
    window.location.reload();
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full px-4}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl ${isDark ? 'bg-[#16181c]' : 'bg-white'} shadow-xl`}>
        <div className="mb-8 text-center">
          <Typography variant="h5" className="font-bold">
            <FormattedMessage id="auth.login" />
          </Typography>
        </div>
        <div className="gap-4 flex flex-col">
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={<FormattedMessage id="auth.email" />}
            type="text"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isDark ? '#202327' : '#f7f9f9',
                '&:hover fieldset': {
                  borderColor: '#1d9bf0',
                },
                '& fieldset': {
                  borderColor: isDark ? '#333639' : '#cfd9de',
                },
              },
              '& .MuiInputLabel-root': {
                color: isDark ? '#71767b' : '#536471',
              },
              '& input': {
                color: isDark ? 'white' : 'black',
              },
            }}
          />

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
                    {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                  </div>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isDark ? '#202327' : '#f7f9f9',
                '&:hover fieldset': {
                  borderColor: '#1d9bf0',
                },
                '& fieldset': {
                  borderColor: isDark ? '#333639' : '#cfd9de',
                },
              },
              '& .MuiInputLabel-root': {
                color: isDark ? '#71767b' : '#536471',
              },
              '& input': {
                color: isDark ? 'white' : 'black',
              },
            }}
          />

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            className="h-12 rounded-full font-bold text-lg normal-case"
            sx={{
              backgroundColor: '#1d9bf0',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1a8cd8',
              },
            }}
          >
            <FormattedMessage id="auth.login" />
          </Button>
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
}

export default LoginForm;
