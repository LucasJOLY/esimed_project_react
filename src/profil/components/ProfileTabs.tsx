import React from "react";
import { Tab, Tabs } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { User } from "../../auth/types";

interface ProfileTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  isDark: boolean;
  showFavoritesTab?: boolean;
  authUser: User;
  currentUser: User;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  value,
  handleChange,
  isDark,
  showFavoritesTab = false,
  authUser,
  currentUser,
}) => {
  return (
    <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="secondary">
      <Tab
        label={
          <FormattedMessage id={authUser?.id === currentUser?.id ? "feed.myPosts" : "feed.posts"} />
        }
        sx={{
          color: isDark ? "white" : "black",
          "&.Mui-selected": {
            color: "#1d9bf0",
          },
        }}
      />
      <Tab
        label={<FormattedMessage id="feed.likedPosts" />}
        sx={{ color: isDark ? "white" : "black" }}
      />
      {showFavoritesTab && (
        <Tab
          label={<FormattedMessage id="feed.favorites" />}
          sx={{ color: isDark ? "white" : "black" }}
        />
      )}
    </Tabs>
  );
};

export default ProfileTabs;
