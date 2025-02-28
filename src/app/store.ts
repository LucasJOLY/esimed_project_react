import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/store/slice';
import themeReducer from '../theme/store/slice';
import languageReducer from '../language/store/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
