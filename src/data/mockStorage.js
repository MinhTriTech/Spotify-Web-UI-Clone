// Mock storage system for persisting user data using localStorage

const STORAGE_KEYS = {
  AUTH_TOKEN: 'spotify_auth_token',
  USER_DATA: 'spotify_user_data',
  LIKED_SONGS: 'spotify_liked_songs',
  FOLLOWED_ARTISTS: 'spotify_followed_artists',
  FOLLOWED_PLAYLISTS: 'spotify_followed_playlists',
  USER_PLAYLISTS: 'spotify_user_playlists',
  RECENTLY_PLAYED: 'spotify_recently_played',
  SEARCH_HISTORY: 'spotify_search_history'
};

class MockStorage {
  // Auth related
  static setAuthToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(token));
  }

  static getAuthToken() {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token ? JSON.parse(token) : null;
  }

  static removeAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  static setUserData(userData) {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }

  static getUserData() {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  static removeUserData() {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // User preferences
  static setLikedSongs(songIds) {
    localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(songIds));
  }

  static getLikedSongs() {
    const likedSongs = localStorage.getItem(STORAGE_KEYS.LIKED_SONGS);
    return likedSongs ? JSON.parse(likedSongs) : [];
  }

  static addLikedSong(songId) {
    const likedSongs = this.getLikedSongs();
    if (!likedSongs.includes(songId)) {
      likedSongs.push(songId);
      this.setLikedSongs(likedSongs);
    }
  }

  static removeLikedSong(songId) {
    const likedSongs = this.getLikedSongs();
    const updatedLikedSongs = likedSongs.filter(id => id !== songId);
    this.setLikedSongs(updatedLikedSongs);
  }

  static setFollowedArtists(artistIds) {
    localStorage.setItem(STORAGE_KEYS.FOLLOWED_ARTISTS, JSON.stringify(artistIds));
  }

  static getFollowedArtists() {
    const followedArtists = localStorage.getItem(STORAGE_KEYS.FOLLOWED_ARTISTS);
    return followedArtists ? JSON.parse(followedArtists) : [];
  }

  static addFollowedArtist(artistId) {
    const followedArtists = this.getFollowedArtists();
    if (!followedArtists.includes(artistId)) {
      followedArtists.push(artistId);
      this.setFollowedArtists(followedArtists);
    }
  }

  static removeFollowedArtist(artistId) {
    const followedArtists = this.getFollowedArtists();
    const updatedFollowedArtists = followedArtists.filter(id => id !== artistId);
    this.setFollowedArtists(updatedFollowedArtists);
  }

  static setFollowedPlaylists(playlistIds) {
    localStorage.setItem(STORAGE_KEYS.FOLLOWED_PLAYLISTS, JSON.stringify(playlistIds));
  }

  static getFollowedPlaylists() {
    const followedPlaylists = localStorage.getItem(STORAGE_KEYS.FOLLOWED_PLAYLISTS);
    return followedPlaylists ? JSON.parse(followedPlaylists) : [];
  }

  static addFollowedPlaylist(playlistId) {
    const followedPlaylists = this.getFollowedPlaylists();
    if (!followedPlaylists.includes(playlistId)) {
      followedPlaylists.push(playlistId);
      this.setFollowedPlaylists(followedPlaylists);
    }
  }

  static removeFollowedPlaylist(playlistId) {
    const followedPlaylists = this.getFollowedPlaylists();
    const updatedFollowedPlaylists = followedPlaylists.filter(id => id !== playlistId);
    this.setFollowedPlaylists(updatedFollowedPlaylists);
  }

  static setUserPlaylists(playlists) {
    localStorage.setItem(STORAGE_KEYS.USER_PLAYLISTS, JSON.stringify(playlists));
  }

  static getUserPlaylists() {
    const userPlaylists = localStorage.getItem(STORAGE_KEYS.USER_PLAYLISTS);
    return userPlaylists ? JSON.parse(userPlaylists) : [];
  }

  static addUserPlaylist(playlist) {
    const userPlaylists = this.getUserPlaylists();
    userPlaylists.push(playlist);
    this.setUserPlaylists(userPlaylists);
  }

  static updateUserPlaylist(playlistId, updatedPlaylist) {
    const userPlaylists = this.getUserPlaylists();
    const index = userPlaylists.findIndex(p => p.id === playlistId);
    if (index !== -1) {
      userPlaylists[index] = { ...userPlaylists[index], ...updatedPlaylist };
      this.setUserPlaylists(userPlaylists);
    }
  }

  static removeUserPlaylist(playlistId) {
    const userPlaylists = this.getUserPlaylists();
    const updatedPlaylists = userPlaylists.filter(p => p.id !== playlistId);
    this.setUserPlaylists(updatedPlaylists);
  }

  static setRecentlyPlayed(tracks) {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(tracks));
  }

  static getRecentlyPlayed() {
    const recentlyPlayed = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
    return recentlyPlayed ? JSON.parse(recentlyPlayed) : [];
  }

  static addRecentlyPlayed(track) {
    const recentlyPlayed = this.getRecentlyPlayed();
    // Remove if already exists to avoid duplicates
    const filtered = recentlyPlayed.filter(t => t.id !== track.id);
    // Add to beginning and limit to 50 items
    const updated = [track, ...filtered].slice(0, 50);
    this.setRecentlyPlayed(updated);
  }

  static setSearchHistory(searches) {
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searches));
  }

  static getSearchHistory() {
    const searchHistory = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return searchHistory ? JSON.parse(searchHistory) : [];
  }

  static addSearchHistory(query) {
    const searchHistory = this.getSearchHistory();
    // Remove if already exists to avoid duplicates
    const filtered = searchHistory.filter(q => q !== query);
    // Add to beginning and limit to 20 items
    const updated = [query, ...filtered].slice(0, 20);
    this.setSearchHistory(updated);
  }

  static clearSearchHistory() {
    this.setSearchHistory([]);
  }

  // Clear all user data (logout)
  static clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Initialize default data for new users
  static initializeUserData(userData) {
    this.setUserData(userData);
    this.setLikedSongs([]);
    this.setFollowedArtists([]);
    this.setFollowedPlaylists([]);
    this.setUserPlaylists([]);
    this.setRecentlyPlayed([]);
    this.setSearchHistory([]);
  }
}

export default MockStorage;