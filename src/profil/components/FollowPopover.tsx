import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, Modal, Typography, TextField } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { IoClose } from "react-icons/io5";
import { User } from "../../auth/types";
import { useNavigate } from "react-router";

interface FollowPopoverProps {
  open: boolean;
  onClose: () => void;
  title: string;
  users: Array<{ id: number; user: User }>;
  isDark: boolean;
}

const FollowPopover: React.FC<FollowPopoverProps> = ({ open, onClose, title, users, isDark }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((follow) =>
    follow.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiBackdrop-root": {
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          width: 400,
          maxHeight: "80vh",
          bgcolor: isDark ? "#16181c" : "white",
          borderRadius: 3,
          boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
          p: 4,
          display: "flex",
          flexDirection: "column",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: isDark ? "white" : "black",
              fontWeight: 600,
            }}
          >
            <FormattedMessage id={title} />
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              "&:hover": {
                color: isDark ? "white" : "black",
              },
            }}
          >
            <IoClose />
          </IconButton>
        </div>

        <TextField
          fullWidth
          variant="outlined"
          placeholder={intl.formatMessage({ id: "searchUser" })}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
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

        <Box
          sx={{
            overflow: "auto",
            maxHeight: "calc(80vh - 200px)",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              background: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
              borderRadius: 4,
              "&:hover": {
                background: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
              },
            },
          }}
        >
          {filteredUsers.map((follow) => (
            <Button
              key={follow.id}
              onClick={() => {
                navigate(`/profile/${follow.user.id}`);
                onClose();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
              className={`w-full border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
              sx={{
                "&:hover": {
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
                },
              }}
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
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    border: isDark
                      ? "2px solid rgba(255, 255, 255, 0.1)"
                      : "2px solid rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Typography>{follow.user.username}</Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default FollowPopover;
