import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
interface SecondaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const SecondaryButton = ({ children, ...props }: SecondaryButtonProps) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  return (
    <Button
      {...props}
      className="!rounded-full !px-4 !py-2"
      sx={{
        textTransform: "none",
        backgroundColor: "transparent",
        color: isDark ? "white" : "black",
        "&:hover": {
          backgroundColor: isDark ? "#212428" : "#f0f0f0",
        },
        border: `1px solid ${isDark ? "#333639" : "#cfd9de"}`,
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
