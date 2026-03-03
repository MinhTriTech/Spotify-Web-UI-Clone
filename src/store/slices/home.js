import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockSongs, mockPlaylists, mockArtists } from '../mockData';

const initialState = {
  topTracks: [],
  featurePlaylists: [],
  artists: [],
  section: 'ALL',
};

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  // Using mock data instead of API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSongs), 100);
  });
});

export const fecthFeaturedPlaylists = createAsyncThunk('home/fecthFeaturedPlaylists', async () => {
  // Using mock data instead of API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPlaylists), 100);
  });
});

export const fecthArtists = createAsyncThunk('home/fecthArtists', async () => {
  // Using mock data instead of API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockArtists), 100);
  });
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopTracks.fulfilled, (state, action) => {
      state.topTracks = action.payload;
    });
    builder.addCase(fecthFeaturedPlaylists.fulfilled, (state, action) => {
      state.featurePlaylists = action.payload;
    });
    builder.addCase(fecthArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fecthFeaturedPlaylists,
  fecthArtists,
};

export default homeSlice.reducer;
