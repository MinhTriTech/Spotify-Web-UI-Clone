// Mock admin services for Spotify clone offline demo
// This handles all admin functionality with mock data

import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { users, artists, albums, songs, playlists } from '../data/mockData.js';

// Admin storage for managing entities
const ADMIN_STORAGE_KEYS = {
  ADMIN_SONGS: 'spotify_admin_songs',
  ADMIN_ALBUMS: 'spotify_admin_albums', 
  ADMIN_ARTISTS: 'spotify_admin_artists',
  ADMIN_PLAYLISTS: 'spotify_admin_playlists',
  ADMIN_USERS: 'spotify_admin_users'
};

class MockAdminStorage {
  static getAdminSongs() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_SONGS);
    return stored ? JSON.parse(stored) : [...songs];
  }

  static setAdminSongs(songList) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_SONGS, JSON.stringify(songList));
  }

  static getAdminAlbums() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_ALBUMS);
    return stored ? JSON.parse(stored) : [...albums];
  }

  static setAdminAlbums(albumList) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_ALBUMS, JSON.stringify(albumList));
  }

  static getAdminArtists() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_ARTISTS);
    return stored ? JSON.parse(stored) : [...artists];
  }

  static setAdminArtists(artistList) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_ARTISTS, JSON.stringify(artistList));
  }

  static getAdminPlaylists() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_PLAYLISTS);
    return stored ? JSON.parse(stored) : [...playlists];
  }

  static setAdminPlaylists(playlistList) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_PLAYLISTS, JSON.stringify(playlistList));
  }

  static getAdminUsers() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_USERS);
    return stored ? JSON.parse(stored) : [...users];
  }

  static setAdminUsers(userList) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_USERS, JSON.stringify(userList));
  }
}

// Helper to check admin privileges
const checkAdminAuth = () => {
  MockAPI.checkAuth();
  const currentUser = MockAPI.getCurrentUser();
  if (currentUser.role !== 'admin') {
    throw new Error('Admin privileges required');
  }
  return currentUser;
};

// USER MANAGEMENT
export const getAllUsers = async () => {
  try {
    checkAdminAuth();
    const users = MockAdminStorage.getAdminUsers();
    return await MockAPI.successResponse(MockAPI.paginateResults(users));
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to fetch users', 500);
  }
};

export const createUser = async (userData) => {
  try {
    checkAdminAuth();
    const users = MockAdminStorage.getAdminUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return await MockAPI.errorResponse('User already exists', 400);
    }

    const newUser = {
      id: MockAPI.generateId(users),
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    users.push(newUser);
    MockAdminStorage.setAdminUsers(users);

    return await MockAPI.successResponse(newUser);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to create user', 500);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    checkAdminAuth();
    const users = MockAdminStorage.getAdminUsers();
    
    const userIndex = users.findIndex(u => u.id === parseInt(userId));
    if (userIndex === -1) {
      return await MockAPI.errorResponse('User not found', 404);
    }

    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updated_at: new Date().toISOString()
    };

    MockAdminStorage.setAdminUsers(users);

    return await MockAPI.successResponse(users[userIndex]);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to update user', 500);
  }
};

export const deleteUser = async (userId) => {
  try {
    checkAdminAuth();
    const users = MockAdminStorage.getAdminUsers();
    
    const filteredUsers = users.filter(u => u.id !== parseInt(userId));
    if (filteredUsers.length === users.length) {
      return await MockAPI.errorResponse('User not found', 404);
    }

    MockAdminStorage.setAdminUsers(filteredUsers);

    return await MockAPI.successResponse({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to delete user', 500);
  }
};

// SONG MANAGEMENT
export const getAllSongs = async () => {
  try {
    checkAdminAuth();
    const songs = MockAdminStorage.getAdminSongs();
    return await MockAPI.successResponse(MockAPI.paginateResults(songs));
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to fetch songs', 500);
  }
};

export const createSong = async (songData) => {
  try {
    checkAdminAuth();
    const songs = MockAdminStorage.getAdminSongs();
    
    const newSong = {
      id: MockAPI.generateId(songs),
      ...songData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    songs.push(newSong);
    MockAdminStorage.setAdminSongs(songs);

    return await MockAPI.successResponse(newSong);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to create song', 500);
  }
};

export const updateSong = async (songId, songData) => {
  try {
    checkAdminAuth();
    const songs = MockAdminStorage.getAdminSongs();
    
    const songIndex = songs.findIndex(s => s.id === parseInt(songId));
    if (songIndex === -1) {
      return await MockAPI.errorResponse('Song not found', 404);
    }

    songs[songIndex] = {
      ...songs[songIndex],
      ...songData,
      updated_at: new Date().toISOString()
    };

    MockAdminStorage.setAdminSongs(songs);

    return await MockAPI.successResponse(songs[songIndex]);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to update song', 500);
  }
};

export const deleteSong = async (songId) => {
  try {
    checkAdminAuth();
    const songs = MockAdminStorage.getAdminSongs();
    
    const filteredSongs = songs.filter(s => s.id !== parseInt(songId));
    if (filteredSongs.length === songs.length) {
      return await MockAPI.errorResponse('Song not found', 404);
    }

    MockAdminStorage.setAdminSongs(filteredSongs);

    return await MockAPI.successResponse({ message: 'Song deleted successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to delete song', 500);
  }
};

// ALBUM MANAGEMENT
export const getAllAlbums = async () => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    return await MockAPI.successResponse(MockAPI.paginateResults(albums));
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to fetch albums', 500);
  }
};

export const createAlbum = async (albumData) => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    
    const newAlbum = {
      id: MockAPI.generateId(albums),
      ...albumData,
      tracks: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    albums.push(newAlbum);
    MockAdminStorage.setAdminAlbums(albums);

    return await MockAPI.successResponse(newAlbum);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to create album', 500);
  }
};

export const updateAlbum = async (albumId, albumData) => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    
    const albumIndex = albums.findIndex(a => a.id === parseInt(albumId));
    if (albumIndex === -1) {
      return await MockAPI.errorResponse('Album not found', 404);
    }

    albums[albumIndex] = {
      ...albums[albumIndex],
      ...albumData,
      updated_at: new Date().toISOString()
    };

    MockAdminStorage.setAdminAlbums(albums);

    return await MockAPI.successResponse(albums[albumIndex]);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to update album', 500);
  }
};

export const deleteAlbum = async (albumId) => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    
    const filteredAlbums = albums.filter(a => a.id !== parseInt(albumId));
    if (filteredAlbums.length === albums.length) {
      return await MockAPI.errorResponse('Album not found', 404);
    }

    MockAdminStorage.setAdminAlbums(filteredAlbums);

    return await MockAPI.successResponse({ message: 'Album deleted successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to delete album', 500);
  }
};

// ARTIST MANAGEMENT  
export const getAllArtists = async () => {
  try {
    checkAdminAuth();
    const artists = MockAdminStorage.getAdminArtists();
    return await MockAPI.successResponse(MockAPI.paginateResults(artists));
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to fetch artists', 500);
  }
};

export const createArtist = async (artistData) => {
  try {
    checkAdminAuth();
    const artists = MockAdminStorage.getAdminArtists();
    
    const newArtist = {
      id: MockAPI.generateId(artists),
      ...artistData,
      followers: 0,
      verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    artists.push(newArtist);
    MockAdminStorage.setAdminArtists(artists);

    return await MockAPI.successResponse(newArtist);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to create artist', 500);
  }
};

export const updateArtist = async (artistId, artistData) => {
  try {
    checkAdminAuth();
    const artists = MockAdminStorage.getAdminArtists();
    
    const artistIndex = artists.findIndex(a => a.id === parseInt(artistId));
    if (artistIndex === -1) {
      return await MockAPI.errorResponse('Artist not found', 404);
    }

    artists[artistIndex] = {
      ...artists[artistIndex],
      ...artistData,
      updated_at: new Date().toISOString()
    };

    MockAdminStorage.setAdminArtists(artists);

    return await MockAPI.successResponse(artists[artistIndex]);
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to update artist', 500);
  }
};

export const deleteArtist = async (artistId) => {
  try {
    checkAdminAuth();
    const artists = MockAdminStorage.getAdminArtists();
    
    const filteredArtists = artists.filter(a => a.id !== parseInt(artistId));
    if (filteredArtists.length === artists.length) {
      return await MockAPI.errorResponse('Artist not found', 404);
    }

    MockAdminStorage.setAdminArtists(filteredArtists);

    return await MockAPI.successResponse({ message: 'Artist deleted successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to delete artist', 500);
  }
};

// PLAYLIST MANAGEMENT
export const getAllPlaylists = async () => {
  try {
    checkAdminAuth();
    const playlists = MockAdminStorage.getAdminPlaylists();
    return await MockAPI.successResponse(MockAPI.paginateResults(playlists));
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to fetch playlists', 500);
  }
};

// Album-Song relationship management
export const addSongToAlbum = async (albumId, songId) => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    
    const albumIndex = albums.findIndex(a => a.id === parseInt(albumId));
    if (albumIndex === -1) {
      return await MockAPI.errorResponse('Album not found', 404);
    }

    if (!albums[albumIndex].tracks.includes(parseInt(songId))) {
      albums[albumIndex].tracks.push(parseInt(songId));
      albums[albumIndex].total_tracks = albums[albumIndex].tracks.length;
      albums[albumIndex].updated_at = new Date().toISOString();
      
      MockAdminStorage.setAdminAlbums(albums);
    }

    return await MockAPI.successResponse({ message: 'Song added to album successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to add song to album', 500);
  }
};

export const removeSongFromAlbum = async (albumId, songId) => {
  try {
    checkAdminAuth();
    const albums = MockAdminStorage.getAdminAlbums();
    
    const albumIndex = albums.findIndex(a => a.id === parseInt(albumId));
    if (albumIndex === -1) {
      return await MockAPI.errorResponse('Album not found', 404);
    }

    albums[albumIndex].tracks = albums[albumIndex].tracks.filter(id => id !== parseInt(songId));
    albums[albumIndex].total_tracks = albums[albumIndex].tracks.length;
    albums[albumIndex].updated_at = new Date().toISOString();
    
    MockAdminStorage.setAdminAlbums(albums);

    return await MockAPI.successResponse({ message: 'Song removed from album successfully' });
  } catch (error) {
    if (error.message === 'Admin privileges required') {
      return await MockAPI.errorResponse('Forbidden', 403);
    }
    return await MockAPI.errorResponse('Failed to remove song from album', 500);
  }
};

// Export all admin services
export const adminServices = {
  // User management
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  
  // Song management
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  
  // Album management
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  
  // Artist management
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  
  // Playlist management
  getAllPlaylists,
  
  // Relationship management
  addSongToAlbum,
  removeSongFromAlbum
};