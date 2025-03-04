import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import ForYouFeed from "./components/ForYouFeed";
import FollowFeed from "./components/FollowFeed";
import { FormattedMessage } from "react-intl";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router";
import PrimaryButton from "../components/buttons/PrimaryButton";
function Feed() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
      >
        <Tab
          label={<FormattedMessage id="feed.forYou" />}
          sx={{
            color: isDark ? "white" : "black",
            "&.Mui-selected": {
              color: "#1d9bf0",
            },
          }}
        />
        <Tab
          label={<FormattedMessage id="feed.following" />}
          sx={{ color: isDark ? "white" : "black" }}
        />
      </Tabs>

      {value === 0 && <ForYouFeed />}
      {value === 1 && <FollowFeed />}

      <PrimaryButton
        onClick={() => navigate("/feed/new-post")}
        sx={{
          gap: 1,
          position: "fixed",
          bottom: { xs: 80, md: 32 },
          right: 32,
        }}
      >
        <FormattedMessage id="feed.newPost" />
        <AiOutlinePlus size={24} />
      </PrimaryButton>
    </Box>
  );
}

export default Feed;
