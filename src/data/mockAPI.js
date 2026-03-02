// Mock API service that simulates backend responses with realistic delays

import { 
  users, 
  artists, 
  albums, 
  songs, 
  playlists, 
  chatRooms, 
  messages, 
  suggestions 
} from './mockData.js';
import MockStorage from './mockStorage.js';

class MockAPI {
  // Simulate network delay
  static delay(min = 200, max = 800) {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Simulate successful response
  static async successResponse(data, status = 200) {
    await this.delay();
    return {
      data,
      status,
      statusText: 'OK'
    };
  }

  // Simulate error response
  static async errorResponse(message, status = 400) {
    await this.delay(100, 300);
    const error = new Error(message);
    error.response = {
      data: { message },
      status,
      statusText: status === 401 ? 'Unauthorized' : status === 404 ? 'Not Found' : 'Bad Request'
    };
    throw error;
  }

  // Random failure simulation (5% chance)
  static shouldFail() {
    return Math.random() < 0.05;
  }

  // Helper to get current user
  static getCurrentUser() {
    const userData = MockStorage.getUserData();
    if (!userData) {
      throw new Error('User not authenticated');
    }
    return users.find(u => u.id === userData.id);
  }

  // Helper to check authentication
  static checkAuth() {
    const token = MockStorage.getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    return token;
  }

  // Helper to find item by id
  static findById(collection, id) {
    const item = collection.find(item => item.id === parseInt(id));
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  // Helper to get songs by ids
  static getSongsByIds(songIds) {
    return songs.filter(song => songIds.includes(song.id));
  }

  // Helper to search in collection
  static searchInCollection(collection, query, fields = ['title', 'name']) {
    const searchTerm = query.toLowerCase();
    return collection.filter(item => 
      fields.some(field => 
        item[field] && item[field].toLowerCase().includes(searchTerm)
      )
    );
  }

  // Generate new ID for creating items
  static generateId(collection) {
    const maxId = Math.max(...collection.map(item => item.id), 0);
    return maxId + 1;
  }

  // Format pagination response
  static paginateResults(results, page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    return {
      results: paginatedResults,
      count: results.length,
      next: endIndex < results.length ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
      total_pages: Math.ceil(results.length / limit)
    };
  }
}

export default MockAPI;