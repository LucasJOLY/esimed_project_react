import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NotificationCard from "./NotificationCard";
import { FormattedMessage } from "react-intl";

const NotificationList: FC = () => {
  const { notifications } = useSelector((state: RootState) => state.notifications);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  if (notifications.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color={isDark ? "white" : "black"}>
          <FormattedMessage id="notifications.noNotifications" />
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </Box>
  );
};

export default NotificationList;
