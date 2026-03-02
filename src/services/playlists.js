import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { songs, playlists, artists } from '../data/mockData.js';

export const fetchTopTracks = async () => {
  try {
    // Return top tracks based on popularity
    const topTracks = [...songs]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 20);
    
    return await MockAPI.successResponse(topTracks);
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch top tracks', 500);
    }
    throw error;
  }
};

const fecthPlaylists = async () => {
  try {
    // Return public playlists
    const publicPlaylists = playlists.filter(p => p.is_public);
    
    return await MockAPI.successResponse(publicPlaylists);
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch suggested playlists', 500);
    }
    throw error;
  }
};

export const fecthArtists = async () => {
  try {
    // Return suggested artists (all artists for demo)
    const suggestedArtists = [...artists].slice(0, 10);
    
    return await MockAPI.successResponse(suggestedArtists);
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch suggested artists', 500);
    }
    throw error;
  }
};

const getSongsOfLikedSong = async () => {
  try {
    MockAPI.checkAuth();
    
    const likedSongIds = MockStorage.getLikedSongs();
    const likedSongs = MockAPI.getSongsByIds(likedSongIds);
    
    return await MockAPI.successResponse(likedSongs);
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch liked songs', 500);
    }
    throw error;
  }
};

const getSongsOfPlaylist = async (id) => {
  try {
    const playlist = MockAPI.findById(playlists, id);
    const playlistSongs = MockAPI.getSongsByIds(playlist.songs);
    
    return await MockAPI.successResponse(playlistSongs);
  } catch (error) {
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch playlist songs', 500);
    }
    throw error;
  }
};

const createPlaylist = async (title, image) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const userPlaylists = MockStorage.getUserPlaylists();
    
    const newPlaylist = {
      id: MockAPI.generateId([...playlists, ...userPlaylists]),
      title: title,
      description: "",
      owner_id: currentUser.id,
      owner_name: currentUser.display_name,
      image: image || "/images/playlists/default.jpg",
      is_public: false,
      followers: 1,
      total_tracks: 0,
      songs: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    MockStorage.addUserPlaylist(newPlaylist);
    
    return newPlaylist;
  } catch (error) {
    if (error.message === 'Authentication required') {
      throw new Error('Unauthorized');
    }
    if (MockAPI.shouldFail()) {
      throw new Error('Failed to create playlist');
    }
    throw error;
  }
};

const deletePlaylist = async (id) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const userPlaylists = MockStorage.getUserPlaylists();
    const playlist = userPlaylists.find(p => p.id === parseInt(id));
    
    if (!playlist) {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    
    if (playlist.owner_id !== currentUser.id) {
      return await MockAPI.errorResponse('Unauthorized to delete this playlist', 403);
    }
    
    MockStorage.removeUserPlaylist(parseInt(id));
    
    return await MockAPI.successResponse({
      message: 'Playlist deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to delete playlist', 500);
    }
    throw error;
  }
};

const getPlaylist = async (id) => {
  try {
    // Check in default playlists first
    let playlist = playlists.find(p => p.id === parseInt(id));
    
    // If not found, check user's playlists
    if (!playlist) {
      const userPlaylists = MockStorage.getUserPlaylists();
      playlist = userPlaylists.find(p => p.id === parseInt(id));
    }
    
    if (!playlist) {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    
    return await MockAPI.successResponse(playlist);
  } catch (error) {
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch playlist', 500);
    }
    throw error;
  }
};

const addPlaylistItems = async (playlist_id, song_id) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const userPlaylists = MockStorage.getUserPlaylists();
    const playlist = userPlaylists.find(p => p.id === parseInt(playlist_id));
    
    if (!playlist) {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    
    if (playlist.owner_id !== currentUser.id) {
      return await MockAPI.errorResponse('Unauthorized to modify this playlist', 403);
    }
    
    const songToAdd = MockAPI.findById(songs, song_id);
    
    if (!playlist.songs.includes(parseInt(song_id))) {
      playlist.songs.push(parseInt(song_id));
      playlist.total_tracks = playlist.songs.length;
      playlist.updated_at = new Date().toISOString();
      
      MockStorage.updateUserPlaylist(parseInt(playlist_id), playlist);
    }
    
    return await MockAPI.successResponse({
      message: 'Song added to playlist successfully'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Song not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to add song to playlist', 500);
    }
    throw error;
  }
};

const removePlaylistItems = async (playlist_id, song_id) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const userPlaylists = MockStorage.getUserPlaylists();
    const playlist = userPlaylists.find(p => p.id === parseInt(playlist_id));
    
    if (!playlist) {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    
    if (playlist.owner_id !== currentUser.id) {
      return await MockAPI.errorResponse('Unauthorized to modify this playlist', 403);
    }
    
    playlist.songs = playlist.songs.filter(id => id !== parseInt(song_id));
    playlist.total_tracks = playlist.songs.length;
    playlist.updated_at = new Date().toISOString();
    
    MockStorage.updateUserPlaylist(parseInt(playlist_id), playlist);
    
    return await MockAPI.successResponse({
      message: 'Song removed from playlist successfully'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to remove song from playlist', 500);
    }
    throw error;
  }
};

const changePlaylistDetails = async (playlist_id, data) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const userPlaylists = MockStorage.getUserPlaylists();
    const playlist = userPlaylists.find(p => p.id === parseInt(playlist_id));
    
    if (!playlist) {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    
    if (playlist.owner_id !== currentUser.id) {
      return await MockAPI.errorResponse('Unauthorized to modify this playlist', 403);
    }
    
    // Update allowed fields
    const allowedFields = ['title', 'description', 'image', 'is_public'];
    const updates = {};
    
    for (const field of allowedFields) {
      if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
        updates[field] = data[field];
      }
    }
    
    updates.updated_at = new Date().toISOString();
    
    MockStorage.updateUserPlaylist(parseInt(playlist_id), updates);
    
    return await MockAPI.successResponse({
      message: 'Playlist updated successfully'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to update playlist', 500);
    }
    throw error;
  }
};

export const playlistService = {
  fetchTopTracks,
  fecthPlaylists,
  fecthArtists,
  
  getSongsOfLikedSong,
  getSongsOfPlaylist,

  createPlaylist,
  deletePlaylist,
  getPlaylist,
  addPlaylistItems,
  removePlaylistItems,
  changePlaylistDetails
};
