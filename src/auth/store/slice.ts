import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, register } from "../api/authAPI";
import { AuthState } from "../types";

const signIn = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    stayConnected,
  }: {
    email: string;
    password: string;
    stayConnected: boolean;
  }) => {
    const response = await login(email, password);
    if (stayConnected) {
      localStorage.setItem("token", response.accessToken);
    } else {
      sessionStorage.setItem("token", response.accessToken);
    }
    return response;
  }
);

const signUp = createAsyncThunk(
  "auth/register",
  async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await register(username, email, password);
    localStorage.setItem("token", response.accessToken);
    return response;
  }
);

const getMe = createAsyncThunk("auth/getMe", async (userId: number) => {
  const response = await getUser(userId);
  return response;
});

const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId: number) => {
    const response = await getUser(userId);
    return response;
  }
);

const initialState: AuthState = {
  token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  user: null,
  userById: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.token = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.token = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.userById = action.payload;
    });
  },
});

export { signIn, signUp, getMe, getUserById };
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
