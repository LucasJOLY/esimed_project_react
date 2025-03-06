import { toast } from "react-toastify";
import { configAPI } from "../../config/apiConfig";
import { Notification } from "../type";
import { getIntl } from "../../language/config/translation";
import { User } from "../../auth/types";

export const getNotifications = async (userId: number): Promise<Notification[]> => {
  try {
    const response = await configAPI.get(`/660/notifications?userId=${userId}&_expand=user`);
    const senderIds = response.data.map((notif: Notification) => notif.senderId);
    const sendersResponse = await configAPI.get(`/660/users?id=${senderIds.join("&id=")}`);
    const senders = sendersResponse.data;

    const notificationsWithSender = response.data.map((notification: Notification) => {
      const sender = senders.find((sender: User) => sender.id === notification.senderId);
      return { ...notification, sender };
    });
    // trie les notifications par date de création
    notificationsWithSender.sort((a: Notification, b: Notification) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return notificationsWithSender;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.notificationsLoadError" }));
    throw error;
  }
};

export const markNotificationAsRead = async (notification: Notification): Promise<Notification> => {
  try {
    const response = await configAPI.patch(`/660/notifications/${notification.id}`, {
      read: true,
    });
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.notificationUpdateError" }));
    throw error;
  }
};

export const markAllNotificationsAsRead = async (userId: number): Promise<Notification[]> => {
  try {
    // Récupérer toutes les notifications non lues de l'utilisateur
    const response = await configAPI.get(
      `/660/notifications?userId=${userId}&read=false&_expand=sender&_expand=user`
    );

    // Mettre à jour chaque notification
    const updatePromises = response.data.map((notification: Notification) =>
      configAPI.patch(`/660/notifications/${notification.id}`, {
        read: true,
      })
    );

    await Promise.all(updatePromises);

    // Récupérer toutes les notifications mises à jour
    const updatedResponse = await configAPI.get(
      `/660/notifications?userId=${userId}&_expand=sender&_expand=user`
    );
    return updatedResponse.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.notificationsUpdateError" }));
    throw error;
  }
};

export const createNotification = async (
  userId: number,
  senderId: number,
  type: string,
  postId?: number
): Promise<Notification> => {
  try {
    const notification = {
      userId,
      senderId,
      type,
      postId,
      read: false,
      created_at: Date.now(),
    };

    const response = await configAPI.post("/660/notifications", notification);
    return response.data;
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.notificationCreateError" }));
    throw error;
  }
};

export const deleteNotification = async (notificationId: number): Promise<void> => {
  try {
    await configAPI.delete(`/660/notifications/${notificationId}`);
  } catch (error) {
    toast.error(getIntl("fr").formatMessage({ id: "toast.notificationDeleteError" }));
    throw error;
  }
};
