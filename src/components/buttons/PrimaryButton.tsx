import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <Button
      {...props}
      className="!rounded-full !px-4 !py-2"
      sx={{
        textTransform: "none",
        backgroundColor: "#1d9bf0",
        color: "white",
        "&:hover": {
          backgroundColor: "#1a8cd8",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
