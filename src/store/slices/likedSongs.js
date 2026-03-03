import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMockLikedSongs } from '../mockData';

const initialState = {
  items: [],
};

export const fetchLikeSongs = createAsyncThunk(
  'likedSongs/fetchLikeSongs',
  async () => {
    // Using mock data instead of API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockLikedSongs()), 100);
    });
  }
);

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    removeSong: (state, action) => {
      state.items = state.items.filter((item) => item.track.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikeSongs.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default likedSongsSlice.reducer;
