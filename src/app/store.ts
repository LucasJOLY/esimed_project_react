import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/store/slice";
import themeReducer from "../theme/store/slice";
import languageReducer from "../language/store/slice";
import postsReducer from "../posts/store/slicePost";
import likesReducer from "../posts/store/sliceLikes";
import repostsReducer from "../posts/store/sliceReposts";
import commentsReducer from "../posts/store/sliceComment";
import profilReducer from "../profil/store/sliceProfil";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
    posts: postsReducer,
    likes: likesReducer,
    reposts: repostsReducer,
    comments: commentsReducer,
    profil: profilReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
