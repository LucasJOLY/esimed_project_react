import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Notification } from "../type";
import {
  getNotifications as getNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI,
  markAllNotificationsAsRead as markAllNotificationsAsReadAPI,
  createNotification as createNotificationAPI,
  deleteNotification as deleteNotificationAPI,
} from "../api/notificationAPI";

// Async Thunks
const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (userId: number, { rejectWithValue }) => {
    try {
      return await getNotificationsAPI(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notification: Notification, { rejectWithValue }) => {
    try {
      return await markNotificationAsReadAPI(notification);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (userId: number, { rejectWithValue }) => {
    try {
      return await markAllNotificationsAsReadAPI(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const destroyNotification = createAsyncThunk(
  "notifications/destroyNotification",
  async (notificationId: number, { rejectWithValue }) => {
    try {
      await deleteNotificationAPI(notificationId);
      return notificationId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const addNewNotification = createAsyncThunk(
  "notifications/addNotification",
  async (
    {
      userId,
      senderId,
      type,
      postId,
    }: { userId: number; senderId: number; type: string; postId?: number },
    { rejectWithValue }
  ) => {
    try {
      return await createNotificationAPI(userId, senderId, type, postId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const removeNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async ({ notificationId }: { notificationId: number }, { rejectWithValue }) => {
    try {
      await deleteNotificationAPI(notificationId);
      return notificationId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Get Notifications
    builder.addCase(getNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.loading = false;
    });

    // Mark as Read
    builder.addCase(markNotificationAsRead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload.id);
      if (notification) {
        notification.read = true;
      }
      state.loading = false;
    });
    builder.addCase(markNotificationAsRead.rejected, (state) => {
      state.loading = false;
    });

    // Mark All as Read
    builder.addCase(markAllNotificationsAsRead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      state.loading = false;
    });
    builder.addCase(markAllNotificationsAsRead.rejected, (state) => {
      state.loading = false;
    });

    // Add New Notification
    builder.addCase(addNewNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewNotification.fulfilled, (state, action) => {
      state.notifications.unshift(action.payload);
      state.loading = false;
    });
    builder.addCase(addNewNotification.rejected, (state) => {
      state.loading = false;
    });

    // Delete Notification
    builder.addCase(removeNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeNotification.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(removeNotification.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(destroyNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(destroyNotification.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      state.loading = false;
    });
    builder.addCase(destroyNotification.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  addNewNotification,
  removeNotification,
};
export default notificationSlice.reducer;
