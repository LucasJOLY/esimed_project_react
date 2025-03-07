import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../store/sliceNotifications";
import { RootState, AppDispatch } from "../../app/store";
import { useIntl } from "react-intl";

export const withNotifications = (WrappedComponent: React.ComponentType<any>) => {
  return function WithNotificationsComponent(props: any) {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.authUser?.id);
    const { notifications } = useSelector((state: RootState) => state.notifications);
    const intl = useIntl();

    // Effet pour charger les notifications
    useEffect(() => {
      if (userId) {
        dispatch(getNotifications(userId));
      }
    }, [dispatch, userId]);

    // Effet séparé pour mettre à jour le titre
    useEffect(() => {
      const unreadCount = notifications.filter((n) => !n.read).length;
      if (unreadCount > 0) {
        document.title = `(${unreadCount}) ${intl.formatMessage({ id: "notifications.title" })}`;
      } else {
        document.title = "CaDitKoi";
      }
    }, [notifications, intl]);

    return <WrappedComponent {...props} />;
  };
};

export default withNotifications;
