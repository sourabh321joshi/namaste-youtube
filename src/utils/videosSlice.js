import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { YOUTUBE_VIDEO_API } from "./constants";

export const fetchPopularVideos = createAsyncThunk(
  "videos/fetchPopularVideos",
  async (pageToken = "", { rejectWithValue }) => {
    try {
      const url = `${YOUTUBE_VIDEO_API}${pageToken ? `&pageToken=${pageToken}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch videos");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    items: [],
    nextPageToken: "",
    loading: false,
    error: "",
  },
  reducers: {
    resetVideos: (state) => {
      state.items = [];
      state.nextPageToken = "";
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularVideos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.nextPageToken = action.payload.nextPageToken || "";
        const merged = [...state.items, ...(action.payload.items || [])];
        state.items = merged.filter(
          (video, index, self) => index === self.findIndex((item) => item.id === video.id)
        );
      })
      .addCase(fetchPopularVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetVideos } = videosSlice.actions;
export default videosSlice.reducer;
