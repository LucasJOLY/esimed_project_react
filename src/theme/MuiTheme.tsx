import { createTheme } from "@mui/material/styles";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
const themeOptions = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    secondary: {
      main: "#1d9bf0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
  },
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
