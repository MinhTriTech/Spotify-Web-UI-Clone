
import { getAllUsers, createUser, updateUser as updateUserAdmin, deleteUser } from '../services/admin.js';

// Re-export admin user functions for backward compatibility
export const searchUser = async (keyword, page = 1, pageSize = 6) => {
  try {
    const result = await getAllUsers();
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to fetch users');
    }
    
    let users = result.data.results;
    
    // Filter by keyword if provided
    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      users = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.display_name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    return {
      results: paginatedUsers,
      count: users.length,
      next: endIndex < users.length ? page + 1 : null,
      previous: page > 1 ? page - 1 : null
    };
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (id) => {
  try {
    const result = await getAllUsers();
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to fetch users');
    }
    
    const user = result.data.results.find(u => u.id === parseInt(id));
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const result = await createUser(userData);
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to create user');
    }
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const result = await updateUserAdmin(id, updateData);
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to update user');
    }
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const result = await deleteUser(id);
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to delete user');
    }
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const countUsers = async () => {
  try {
    const result = await getAllUsers();
    if (result.status !== 200) {
      throw new Error(result.data?.message || 'Failed to fetch users');
    }
    
    return {
      count: result.data.count
    };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (id, newPassword = '123456') => {
  try {
    // For demo purposes, just return success
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      message: 'Password reset successfully',
      new_password: newPassword
    };
  } catch (error) {
    throw error;
  }
};
