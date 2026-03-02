import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { users, songs, artists, playlists } from '../data/mockData.js';

export const saveTracks = async (id) => {
  try {
    MockAPI.checkAuth();
    
    const song = MockAPI.findById(songs, id);
    MockStorage.addLikedSong(parseInt(id));
    
    // Add to recently played
    MockStorage.addRecentlyPlayed(song);
    
    return await MockAPI.successResponse({
      message: 'Song added to favorites'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Song not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to save track', 500);
    }
    throw error;
  }
};

export const deleteTracks = async (id) => {
  try {
    MockAPI.checkAuth();
    
    MockStorage.removeLikedSong(parseInt(id));
    
    return await MockAPI.successResponse({
      message: 'Song removed from favorites'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to remove track', 500);
    }
    throw error;
  }
};

export const followArtists = async (id) => {
  try {
    MockAPI.checkAuth();
    
    const artist = MockAPI.findById(artists, id);
    MockStorage.addFollowedArtist(parseInt(id));
    
    return await MockAPI.successResponse({
      message: 'Artist followed'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Artist not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to follow artist', 500);
    }
    throw error;
  }
};

export const unfollowArtists = async (id) => {
  try {
    MockAPI.checkAuth();
    
    MockStorage.removeFollowedArtist(parseInt(id));
    
    return await MockAPI.successResponse({
      message: 'Artist unfollowed'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to unfollow artist', 500);
    }
    throw error;
  }
};

export const getSavedTracks = async () => {
  try {
    MockAPI.checkAuth();
    
    const likedSongIds = MockStorage.getLikedSongs();
    const savedTracks = MockAPI.getSongsByIds(likedSongIds);
    
    return await MockAPI.successResponse(savedTracks);
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch saved tracks', 500);
    }
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const user = MockAPI.findById(users, id);
    
    // Return public user info only
    const publicUserInfo = {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      profile_image: user.profile_image,
      followers: user.followers,
      following: user.following,
      country: user.country,
      verified: user.verified || false
    };
    
    return await MockAPI.successResponse(publicUserInfo);
  } catch (error) {
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('User not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch user', 500);
    }
    throw error;
  }
};

export const unfollowPlaylist = async (playlistId) => {
  try {
    MockAPI.checkAuth();
    
    MockStorage.removeFollowedPlaylist(parseInt(playlistId));
    
    return await MockAPI.successResponse({
      message: 'Playlist unfollowed'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to unfollow playlist', 500);
    }
    throw error;
  }
};

export const followPlaylist = async (playlistId) => {
  try {
    MockAPI.checkAuth();
    
    const playlist = MockAPI.findById(playlists, playlistId);
    MockStorage.addFollowedPlaylist(parseInt(playlistId));
    
    return await MockAPI.successResponse({
      message: 'Playlist followed'
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return await MockAPI.errorResponse('Unauthorized', 401);
    }
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Playlist not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to follow playlist', 500);
    }
    throw error;
  }
};

export const userService = {
  getUser,
  saveTracks,
  deleteTracks,
  getSavedTracks,
  followPlaylist,
  unfollowPlaylist,
  followArtists,
  unfollowArtists,
};
