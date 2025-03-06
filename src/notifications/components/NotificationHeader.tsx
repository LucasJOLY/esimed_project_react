import { FC } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { markAllNotificationsAsRead } from "../store/sliceNotifications";
import { RootState, AppDispatch } from "../../app/store";
import { FormattedMessage } from "react-intl";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const NotificationHeader: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const handleMarkAllAsRead = () => {
    if (notifications.length > 0) {
      dispatch(markAllNotificationsAsRead(notifications[0].userId));
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
      {notifications.length > 0 && (
        <PrimaryButton
          variant="outlined"
          size="small"
          onClick={handleMarkAllAsRead}
          sx={{
            backgroundColor: "transparent",
            color: "#1d9bf0",
            border: "1px solid #1d9bf0",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#1d9bf0",
              border: "1px solid #1d9bf0",
            },
          }}
        >
          <FormattedMessage id="notifications.markAllAsRead" />
        </PrimaryButton>
      )}
    </Box>
  );
};

export default NotificationHeader;
