import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMockUser } from '../mockData';

const initialState = {
  user: null,
  playlists: [],
};

const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (id) => {
    // Using mock data instead of API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockUser(id)), 100);
    });
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.playlists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.playlists = action.payload.playlists;
    });
  },
});

export const profileActions = {
  fetchUser,
  ...profileSlice.actions,
};

export default profileSlice.reducer;
