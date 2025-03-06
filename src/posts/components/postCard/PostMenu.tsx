import { IconButton, Popover, Button } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import { FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

interface PostMenuProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  isDark: boolean;
}

const PostMenu = ({ onEdit, onDelete, isDark }: PostMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuClick} size="small" sx={{ color: isDark ? "white" : "black" }}>
        <BsThreeDots />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div
          className={`p-2 flex flex-col ${isDark ? "bg-[#16181c]" : "bg-white"}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button
            onClick={onEdit}
            sx={{
              color: isDark ? "white" : "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <FaPen />
            <FormattedMessage id="post.edit" />
          </Button>
          <Button
            onClick={onDelete}
            sx={{
              color: "#ff0000",
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <FaTrash />
            <FormattedMessage id="post.delete" />
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default PostMenu;
