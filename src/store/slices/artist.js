import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMockArtist } from '../mockData';

const initialState = {
  artist: null,
  topTracks: [],
  following: false,
  albums: [],
};

export const fetchArtist = createAsyncThunk(
  'artist/fetchArtist',
  async (id) => {
    // Using mock data instead of API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockArtist(id)), 100);
    });
  }
);

export const getInfoArtist = createAsyncThunk(
  'artist/getInfoArtist',
  async (id) => {
    // Using mock data instead of API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockArtist(id)), 100);
    });
  }
);

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setFollowing(state, action) {
      state.following = action.payload.following;
    },
    setArtist(state, action) {
      state.artist = action.payload.artist;
      if (!action.payload.artist) {
        state.artist = null;
        state.topTracks = [];
        state.albums = [];
        state.following = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload.artist;
      state.topTracks = action.payload.songs;
      state.albums = action.payload.albums;
      state.following = action.payload.is_following;
    });
    builder.addCase(getInfoArtist.fulfilled, (state, action) => {
      state.artist = action.payload.artist;
    });
  },
});

export const artistActions = {
  fetchArtist,
  getInfoArtist,
  ...artistSlice.actions,
};

export default artistSlice.reducer;
