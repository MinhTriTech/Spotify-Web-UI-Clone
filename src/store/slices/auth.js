import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockUsers } from '../mockData';

import { uiActions } from './ui'

const initialState = {
  user: null,
  role: false,
};

export const handleRegister = createAsyncThunk('auth/register', async (userData) => {
  // Using mock data - simulate successful registration
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        ...mockUsers[0],
        username: userData.username || 'new_user',
        email: userData.email || 'user@example.com',
        display_name: userData.display_name || 'New User',
      };
      resolve(newUser);
    }, 300);
  });
});

export const handleLogin = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      // Using mock data - simulate login
      return new Promise((resolve) => {
        setTimeout(() => {
          // Check if admin credentials
          if (userData.username === 'admin' || userData.email === 'admin@example.com') {
            resolve(mockUsers[1]); // Admin user
          } else {
            resolve(mockUsers[0]); // Regular user
          }
        }, 300);
      });
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const handleLoginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (token, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      // Using mock data - simulate Google login
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUsers[0]);
        }, 300);
      });
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userData, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      // Using mock data - fetch current user
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUsers[0]);
        }, 100);
      });
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const handleLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      // Using mock data - simulate logout
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 100);
      });
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info?.is_staff || false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info.is_staff;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info.is_staff;
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.user = null;
        state.role = false;
      })
      .addCase(handleLoginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info?.is_staff || action.payload.is_staff || false;
      })
  },
});

export default authSlice.reducer;




