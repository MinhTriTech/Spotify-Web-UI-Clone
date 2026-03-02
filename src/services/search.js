import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { songs, artists, albums, playlists } from '../data/mockData.js';

const fetchSearch = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      return await MockAPI.successResponse({
        songs: [],
        artists: [],
        albums: [],
        playlists: []
      });
    }

    const searchTerm = query.trim();
    
    // Search in songs
    const foundSongs = MockAPI.searchInCollection(
      songs, 
      searchTerm, 
      ['title', 'artist_name', 'album_name']
    );

    // Search in artists
    const foundArtists = MockAPI.searchInCollection(
      artists, 
      searchTerm, 
      ['name']
    );

    // Search in albums
    const foundAlbums = MockAPI.searchInCollection(
      albums, 
      searchTerm, 
      ['title', 'artist_name']
    );

    // Search in playlists (only public ones)
    const foundPlaylists = MockAPI.searchInCollection(
      playlists.filter(p => p.is_public), 
      searchTerm, 
      ['title', 'description', 'owner_name']
    );

    // Store search history if user is authenticated
    try {
      MockAPI.checkAuth();
      MockStorage.addSearchHistory(searchTerm);
    } catch (error) {
      // User not authenticated, skip storing search history
    }

    const searchResults = {
      songs: foundSongs.slice(0, 20), // Limit to 20 results
      artists: foundArtists.slice(0, 10), // Limit to 10 results
      albums: foundAlbums.slice(0, 10), // Limit to 10 results
      playlists: foundPlaylists.slice(0, 10), // Limit to 10 results
      query: searchTerm,
      total_results: foundSongs.length + foundArtists.length + foundAlbums.length + foundPlaylists.length
    };

    return await MockAPI.successResponse(searchResults);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error);
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Search failed', 500);
    }
    return null;
  }
};

export const searchService = {
  fetchSearch,
};
