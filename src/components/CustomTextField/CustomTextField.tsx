import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type CustomTextFieldProps = TextFieldProps & {
  isDark?: boolean;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({ isDark, ...props }) => {
  const themeIsDark = useSelector((state: RootState) => state.theme.isDark);
  const darkMode = isDark ?? themeIsDark;

  return (
    <TextField
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: darkMode ? "#202327" : "#f7f9f9",
          "&:hover fieldset": {
            borderColor: "#1d9bf0",
          },
          "& fieldset": {
            borderColor: darkMode ? "#333639" : "#cfd9de",
          },
        },
        "& .MuiInputLabel-root": {
          color: darkMode ? "#71767b" : "#536471",
        },
        "& input": {
          color: darkMode ? "white" : "black",
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
