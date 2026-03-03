import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMockAlbum } from '../mockData';

const initialState = {
  album: null,
  tracks: [],
  artist: null,
  order: 'ALL',
  view: 'LIST',
};

export const fetchAlbum = createAsyncThunk(
  'album/fetchAlbum',
    async (id) => {
      // Using mock data instead of API call
      return new Promise((resolve) => {
        setTimeout(() => resolve(getMockAlbum(id)), 100);
      });
    }
);

export const getSongsOfAlbum = createAsyncThunk(
  'album/getSongsOfFeaturedAlbum',
  async (id) => {
    // Using mock data instead of API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockAlbum(id).songs), 100);
    });
  }
);

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum(state, action) {
      state.album = action.payload.album;
      if (!action.payload.album) {
        state.tracks = [];
        state.artist = null;
        state.view = 'LIST';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload.album;
      state.tracks = action.payload.songs;
      state.artist = action.payload.album.artist_id;
    });
  },
});

export const albumActions = {
  fetchAlbum,
  getSongsOfAlbum,
  ...albumSlice.actions,
};

export default albumSlice.reducer;
