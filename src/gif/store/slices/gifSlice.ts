import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchGifs } from "../../api/gifAPI";

interface GifState {
  gifs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: GifState = {
  gifs: [],
  loading: false,
  error: null,
};

export const searchGifsThunk = createAsyncThunk(
  "gifs/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await searchGifs(query);
      if (response.meta.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.meta.msg);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const gifSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    clearGifs: (state) => {
      state.gifs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGifsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchGifsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gifs = action.payload;
      })
      .addCase(searchGifsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGifs } = gifSlice.actions;
export default gifSlice.reducer;
