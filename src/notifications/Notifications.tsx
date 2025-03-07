import { FC, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "./store/sliceNotifications";
import { RootState, AppDispatch } from "../app/store";
import NotificationHeader from "./components/NotificationHeader";
import NotificationList from "./components/NotificationList";

const Notifications: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.notifications);
  const userId = useSelector((state: RootState) => state.auth.authUser?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getNotifications(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ py: 4 }}>
          <NotificationHeader />
          <NotificationList />
        </Box>
      )}
    </div>
  );
};

export default Notifications;
