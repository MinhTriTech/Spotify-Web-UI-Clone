import MockAPI from '../data/mockAPI.js';
import { albums, songs } from '../data/mockData.js';

const getAlbum = async (id) => {
  try {
    const album = MockAPI.findById(albums, id);
    
    return await MockAPI.successResponse(album);
  } catch (error) {
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Album not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch album', 500);
    }
    throw error;
  }
};

const getSongsOfAlbum = async (id) => {
  try {
    const album = MockAPI.findById(albums, id);
    const albumSongs = MockAPI.getSongsByIds(album.tracks);
    
    return await MockAPI.successResponse(albumSongs);
  } catch (error) {
    if (error.message === 'Item not found') {
      return await MockAPI.errorResponse('Album not found', 404);
    }
    if (MockAPI.shouldFail()) {
      return await MockAPI.errorResponse('Failed to fetch album songs', 500);
    }
    throw error;
  }
};

export const albumsService = {
  getAlbum,
  getSongsOfAlbum,
};
