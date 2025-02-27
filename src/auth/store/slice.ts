import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, register } from "../api/authAPI";

const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const signUp = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }: { username: string; email: string; password: string }) => {
    try {
      const response = await register(username, email, password);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const getMe = createAsyncThunk("auth/getMe", async (userId: number) => {
  try {
    const response = await getUser(userId);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export { signIn, signUp, getMe };
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
