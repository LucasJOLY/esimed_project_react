import { createTheme } from "@mui/material/styles";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3880ff",
          borderRadius: 10,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2d67d4",
          },
        },
      },
    },
  },
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
