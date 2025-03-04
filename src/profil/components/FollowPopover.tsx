import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { IoClose } from "react-icons/io5";
import { User } from "../../auth/types";
import { useNavigate } from "react-router";
interface FollowPopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  title: string;
  users: Array<{ id: number; user: User }>;
  isDark: boolean;
}

const FollowPopover: React.FC<FollowPopoverProps> = ({
  open,
  onClose,
  anchorEl,
  title,
  users,
  isDark,
}) => {
  const navigate = useNavigate();
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Box
        sx={{
          width: 300,
          maxHeight: 400,
          overflow: "auto",
          position: "relative",
          backgroundColor: isDark ? "#16181c" : "white",
        }}
      >
        <div className="flex justify-between items-center p-3">
          <Typography>
            <FormattedMessage id={title} />
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              minWidth: "auto",
              display: "flex",
              justifyContent: "flex-end",
              color: isDark ? "white" : "black",
            }}
          >
            <IoClose />
          </IconButton>
        </div>
        {users?.map((follow) => (
          <Button
            key={follow.id}
            onClick={() => {
              navigate(`/profile/${follow.user.id}`);
            }}
            style={{ textDecoration: "none", color: "inherit" }}
            className={`w-full border-b ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 2,
                color: isDark ? "white" : "black",
              }}
            >
              <Avatar sx={{ width: 40, height: 40 }} />
              <Typography>{follow.user.username}</Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Popover>
  );
};

export default FollowPopover;
