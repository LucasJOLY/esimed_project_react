import React from "react";
import { Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

interface SelectedImageProps {
  imageUrl: string;
  onRemove: () => void;
  alt?: string;
}

const SelectedImage: React.FC<SelectedImageProps> = ({
  imageUrl,
  onRemove,
  alt = "Selected image",
}) => {
  return (
    <Box sx={{ position: "relative", mb: 1, display: "flex", justifyContent: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={imageUrl}
          alt={alt}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "100%" },
            maxHeight: "250px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <IconButton
          onClick={onRemove}
          sx={{
            position: "absolute",
            top: -12,
            right: -12,
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "#dc2626",
            },
            width: 32,
            height: 32,
            border: "2px solid red",
          }}
        >
          <IoClose size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SelectedImage;
