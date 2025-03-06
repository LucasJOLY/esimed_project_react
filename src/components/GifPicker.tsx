import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Modal,
  Typography,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";
import { MdOutlineGif } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { searchGifsThunk, clearGifs } from "../gif/store/slices/gifSlice";
import PrimaryButton from "./buttons/PrimaryButton";

interface GifPickerProps {
  onSelect: (gifUrl: string) => void;
  isDark: boolean;
}

const GifPicker: React.FC<GifPickerProps> = ({ onSelect, isDark }) => {
  const [open, setOpen] = useState(false);
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { gifs, loading, error } = useSelector((state: RootState) => state.gifs);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchGifsThunk(searchQuery));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchQuery("");
    dispatch(clearGifs());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleGifSelect = (gifUrl: string) => {
    onSelect(gifUrl);
    handleClose();
  };

  return (
    <>
      <PrimaryButton
        onClick={handleOpen}
        sx={{
          gap: 1,
          backgroundColor: "transparent",
          color: "#1d9bf0",
          border: "1px solid #1d9bf0",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#1d9bf0",
          },
        }}
      >
        <FormattedMessage id="gifPicker.addGif" />
        <MdOutlineGif size={25} />
      </PrimaryButton>

      <Modal
        open={open}
        onClose={handleClose}
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
            width: "80%",
            maxWidth: 800,
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
              <FormattedMessage id="gifPicker.title" />
            </Typography>
            <IconButton
              onClick={handleClose}
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
            placeholder={intl.formatMessage({ id: "gifPicker.searchPlaceholder" })}
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              mb: 2,
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

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

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
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ImageList cols={3} rowHeight={200} gap={8}>
                {gifs.map(
                  (gif: {
                    id: string;
                    title: string;
                    images: { original: { url: string }; fixed_height: { url: string } };
                  }) => (
                    <ImageListItem
                      key={gif.id}
                      onClick={() => handleGifSelect(gif.images.original.url)}
                      sx={{ cursor: "pointer" }}
                    >
                      <img
                        src={gif.images.fixed_height.url}
                        alt={gif.title}
                        loading="lazy"
                        style={{ borderRadius: "8px", width: "100%", height: "100%" }}
                      />
                    </ImageListItem>
                  )
                )}
              </ImageList>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GifPicker;
