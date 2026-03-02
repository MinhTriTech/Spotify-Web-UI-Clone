import MockAPI from '../data/mockAPI.js';
import { artists, songs } from '../data/mockData.js';

export const fetchArtist = async (id) => {
  try {
    const artist = MockAPI.findById(artists, id);
    
    // Get artist's songs
    const artistSongs = songs.filter(song => song.artist_id === artist.id);
    
    // Enhanced artist data
    const enhancedArtist = {
      ...artist,
      songs: artistSongs,
      monthly_listeners: Math.floor(Math.random() * 10000000) + 5000000, // Random monthly listeners
      is_verified: artist.verified || true
    };
    
    return enhancedArtist;
  } catch (error) {
    if (error.message === 'Item not found') {
      throw new Error('Artist not found');
    }
    if (MockAPI.shouldFail()) {
      throw new Error('Failed to fetch artist');
    }
    throw error;
  }
};

export const artistService = {
  fetchArtist,
};
