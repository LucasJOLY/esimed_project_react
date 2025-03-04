import { Popover, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  FaFilter,
  FaHeart,
  FaSortAmountDown,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function FilterComponent({
  filterByLikes,
  filterByTime,
  setFilterByLikes,
  setFilterByTime,
}: {
  filterByLikes: boolean;
  filterByTime: boolean;
  setFilterByLikes: (filterByLikes: boolean) => void;
  setFilterByTime: (filterByTime: boolean) => void;
}) {
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newSort: string
  ) => {
    if (newSort === "popular") {
      setFilterByLikes(true);
      setFilterByTime(true);
    } else if (newSort === "newest") {
      setFilterByLikes(false);
      setFilterByTime(true);
    } else if (newSort === "oldest") {
      setFilterByLikes(false);
      setFilterByTime(false);
    }
  };

  return (
    <div className="flex justify-end">
      <PrimaryButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          color: "#1d9bf0",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: isDark ? "#212428" : "#f0f0f0",
          },
          gap: "0.5rem",
        }}
      >
        <FaFilter />
        <FormattedMessage id="feed.filter" />
      </PrimaryButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ToggleButtonGroup
          value={filterByLikes ? "popular" : filterByTime ? "newest" : "oldest"}
          exclusive
          onChange={handleSortChange}
          orientation="vertical"
          sx={{
            backgroundColor: isDark ? "#16181c" : "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ToggleButton
            value="popular"
            sx={{
              color: isDark ? "white" : "black",
              "&.Mui-selected": {
                backgroundColor: isDark ? "#212428" : "#e8e8e8",
                color: "#1d9bf0",
              },
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "flex-start",
              width: "100%",
              textTransform: "none",
            }}
          >
            <FaHeart />
            <FormattedMessage id="feed.filter.popular" />
          </ToggleButton>
          <ToggleButton
            value="newest"
            sx={{
              color: isDark ? "white" : "black",
              "&.Mui-selected": {
                backgroundColor: isDark ? "#212428" : "#e8e8e8",
                color: "#1d9bf0",
              },
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "flex-start",
              width: "100%",
              textTransform: "none",
            }}
          >
            <FaSortAmountDown />
            <FormattedMessage id="feed.filter.newest" />
          </ToggleButton>
          <ToggleButton
            value="oldest"
            sx={{
              color: isDark ? "white" : "black",
              "&.Mui-selected": {
                backgroundColor: isDark ? "#212428" : "#e8e8e8",
                color: "#1d9bf0",
              },
              "&:hover": {
                backgroundColor: isDark ? "#212428" : "#f0f0f0",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "flex-start",
              width: "100%",
              textTransform: "none",
            }}
          >
            <FaSortAmountDownAlt />
            <FormattedMessage id="feed.filter.oldest" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Popover>
    </div>
  );
}

export default FilterComponent;
