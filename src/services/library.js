import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { songs, artists, playlists } from '../data/mockData.js';

export const getMyLikeSongs = async () => {
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

export const getMyPlaylists = async () => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    // Get user's created playlists
    const userPlaylists = MockStorage.getUserPlaylists();
    
    // Get followed playlists
    const followedPlaylistIds = MockStorage.getFollowedPlaylists();
    const followedPlaylists = playlists.filter(p => 
      followedPlaylistIds.includes(p.id) && p.owner_id !== currentUser.id
    );
    
    // Combine both
    const myPlaylists = [...userPlaylists, ...followedPlaylists];
    
    return await MockAPI.successResponse(myPlaylists);
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch user playlists', 500);
    }
    throw error;
  }
};

const getFollowedArtists = async () => {
  try {
    MockAPI.checkAuth();
    
    const followedArtistIds = MockStorage.getFollowedArtists();
    const followedArtists = artists.filter(a => followedArtistIds.includes(a.id));
    
    return await MockAPI.successResponse(followedArtists);
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch followed artists', 500);
    }
    throw error;
  }
};

const checkLiked = async (id) => {
  try {
    MockAPI.checkAuth();
    
    const likedSongIds = MockStorage.getLikedSongs();
    const isLiked = likedSongIds.includes(parseInt(id));
    
    return await MockAPI.successResponse({ 
      is_favorite: isLiked 
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to check liked status', 500);
    }
    throw error;
  }
};

export const libraryService = {
  getMyLikeSongs,
  getMyPlaylists,
  getFollowedArtists,
  checkLiked,
};
