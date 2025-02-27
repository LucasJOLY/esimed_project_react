import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router";
import useDispatchNavigate from "../hook/useDispatchNavigate";
import { signIn } from "./store/slice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm: React.FC = () => {
  const dispatchNavigate = useDispatchNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await dispatchNavigate(signIn({ email, password }), "/courses");
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        height: "100%",
      }}
    >
      <Typography variant="h4" className="mb-10!">
        Connexion
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="text"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <div 
              onClick={() => setShowPassword(!showPassword)}
              style={{cursor: 'pointer'}}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          ),
        }}
      />
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        className="mt-5!"
        sx={{
          backgroundColor: "#0faf52",
          borderRadius: 10,
          "&:hover": {
            backgroundColor: "#11873f",
          },
          color: "white",
        }}
      >
        Se connecter
      </Button>

      <NavLink
        to="/register"
        end
        style={{
          color: "#0faf52",

          marginTop: "20px",
          fontSize: "15px",
          textDecoration: "underline",
        }}
      >
        Pas encore inscrit ? S'inscrire
      </NavLink>
    </div>
  );
}

export default LoginForm;
