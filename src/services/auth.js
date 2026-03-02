import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { users } from '../data/mockData.js';

export const register = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email || u.username === userData.username);
    if (existingUser) {
      return await MockAPI.errorResponse('User already exists', 400);
    }

    // Create new user
    const newUser = {
      id: MockAPI.generateId(users),
      username: userData.username,
      email: userData.email,
      display_name: userData.display_name || userData.username,
      profile_image: "/images/User/default-avatar.png",
      followers: 0,
      following: 0,
      country: userData.country || "VN",
      role: "user",
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    // Generate auth token
    const authToken = {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_in: 3600,
      token_type: 'Bearer'
    };

    // Store auth data
    MockStorage.setAuthToken(authToken);
    MockStorage.initializeUserData(newUser);

    return await MockAPI.successResponse({
      user: newUser,
      ...authToken
    });
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Registration failed', 500);
    }
    throw error;
  }
};

export const login = async (userData) => {
  try {
    let user;
    
    // Find user by email or username
    if (userData.email) {
      user = users.find(u => u.email === userData.email);
    } else if (userData.username) {
      user = users.find(u => u.username === userData.username);
    }

    // Demo: Accept any password for existing users, or create demo user
    if (!user) {
      // For demo purposes, create a demo user if not found
      user = users[0]; // Use demo_user by default
    }

    if (!user) {
      return await MockAPI.errorResponse('Invalid credentials', 401);
    }

    // Generate auth token
    const authToken = {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_in: 3600,
      token_type: 'Bearer'
    };

    // Store auth data
    MockStorage.setAuthToken(authToken);
    MockStorage.setUserData(user);

    return await MockAPI.successResponse({
      user: user,
      ...authToken
    });
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Login failed', 500);
    }
    throw error;
  }
};

export const loginWithGoogle = async (token) => {
  try {
    // For demo purposes, simulate Google login with demo user
    const user = users[0]; // demo_user

    // Generate auth token
    const authToken = {
      access_token: `mock_google_token_${Date.now()}`,
      refresh_token: `mock_google_refresh_${Date.now()}`,
      expires_in: 3600,
      token_type: 'Bearer'
    };

    // Store auth data
    MockStorage.setAuthToken(authToken);
    MockStorage.setUserData(user);

    return await MockAPI.successResponse({
      user: user,
      ...authToken
    });
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Google login failed', 500);
    }
    throw error;
  }
};

export const fetchUserApi = async (userData) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    return await MockAPI.successResponse({
      user: currentUser
    });
  } catch (error) {
    if (error.message === 'User not authenticated' || error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch user info', 500);
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    // Clear all stored data
    MockStorage.clearAll();
    
    return await MockAPI.successResponse({
      message: 'Logged out successfully'
    });
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Logout failed', 500);
    }
    throw error;
  }
};

export const authService = {
  fetchUserApi,
};


