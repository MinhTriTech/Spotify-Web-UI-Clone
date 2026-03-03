// Mock Data for Spotify Clone
// This file contains all mock data to replace API calls

export const mockArtists = [
  {
    artist_id: 1,
    id: 1,
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
    bio: 'Canadian singer, songwriter, and producer known for his distinctive voice and dark, atmospheric music.',
    followers: 95000000,
    monthly_listeners: 85000000,
    verified: true,
  },
  {
    artist_id: 2,
    id: 2,
    name: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
    bio: 'American singer-songwriter known for narrative songs about her personal life.',
    followers: 92000000,
    monthly_listeners: 80000000,
    verified: true,
  },
  {
    artist_id: 3,
    id: 3,
    name: 'Drake',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
    bio: 'Canadian rapper, singer, and actor who has shaped modern hip-hop.',
    followers: 78000000,
    monthly_listeners: 72000000,
    verified: true,
  },
  {
    artist_id: 4,
    id: 4,
    name: 'Billie Eilish',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4e8a7e14e2f602eb9af24e31',
    bio: 'American singer-songwriter known for her unique dark pop sound.',
    followers: 65000000,
    monthly_listeners: 60000000,
    verified: true,
  },
  {
    artist_id: 5,
    id: 5,
    name: 'Ed Sheeran',
    image: 'https://i.scdn.co/image/ab6761610000e5eb13cdb6e4f5f02c87d7b236a4',
    bio: 'English singer-songwriter known for his acoustic pop hits.',
    followers: 70000000,
    monthly_listeners: 65000000,
    verified: true,
  },
  {
    artist_id: 6,
    id: 6,
    name: 'Ariana Grande',
    image: 'https://i.scdn.co/image/ab6761610000e5ebc8e00f6b7b5b0f2c8c0b0f2a',
    bio: 'American singer, songwriter and actress with a powerful four-octave vocal range.',
    followers: 82000000,
    monthly_listeners: 75000000,
    verified: true,
  },
];

export const mockSongs = [
  {
    song_id: 1,
    id: 1,
    title: 'Blinding Lights',
    name: 'Blinding Lights',
    duration: 200,
    duration_ms: 200000,
    image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    preview_url: 'https://p.scdn.co/mp3-preview/1234',
    artist_id: 1,
    album_id: 1,
    artists: [{ id: 1, name: 'The Weeknd' }],
    album: {
      id: 1,
      name: 'After Hours',
      image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    },
  },
  {
    song_id: 2,
    id: 2,
    title: 'Starboy',
    name: 'Starboy',
    duration: 230,
    duration_ms: 230000,
    image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    preview_url: 'https://p.scdn.co/mp3-preview/5678',
    artist_id: 1,
    album_id: 1,
    artists: [{ id: 1, name: 'The Weeknd' }],
    album: {
      id: 1,
      name: 'After Hours',
      image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    },
  },
  {
    song_id: 3,
    id: 3,
    title: 'Anti-Hero',
    name: 'Anti-Hero',
    duration: 201,
    duration_ms: 201000,
    image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    preview_url: 'https://p.scdn.co/mp3-preview/anti',
    artist_id: 2,
    album_id: 2,
    artists: [{ id: 2, name: 'Taylor Swift' }],
    album: {
      id: 2,
      name: 'Midnights',
      image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    },
  },
  {
    song_id: 4,
    id: 4,
    title: 'Shake It Off',
    name: 'Shake It Off',
    duration: 242,
    duration_ms: 242000,
    image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    preview_url: 'https://p.scdn.co/mp3-preview/shake',
    artist_id: 2,
    album_id: 2,
    artists: [{ id: 2, name: 'Taylor Swift' }],
    album: {
      id: 2,
      name: '1989',
      image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    },
  },
  {
    song_id: 5,
    id: 5,
    title: 'One Dance',
    name: 'One Dance',
    duration: 173,
    duration_ms: 173000,
    image: 'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
    preview_url: 'https://p.scdn.co/mp3-preview/onedance',
    artist_id: 3,
    album_id: 3,
    artists: [{ id: 3, name: 'Drake' }],
    album: {
      id: 3,
      name: 'Views',
      image: 'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
    },
  },
  {
    song_id: 6,
    id: 6,
    title: 'bad guy',
    name: 'bad guy',
    duration: 194,
    duration_ms: 194000,
    image: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
    preview_url: 'https://p.scdn.co/mp3-preview/badguy',
    artist_id: 4,
    album_id: 4,
    artists: [{ id: 4, name: 'Billie Eilish' }],
    album: {
      id: 4,
      name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
      image: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
    },
  },
  {
    song_id: 7,
    id: 7,
    title: 'Shape of You',
    name: 'Shape of You',
    duration: 233,
    duration_ms: 233000,
    image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    preview_url: 'https://p.scdn.co/mp3-preview/shape',
    artist_id: 5,
    album_id: 5,
    artists: [{ id: 5, name: 'Ed Sheeran' }],
    album: {
      id: 5,
      name: '÷ (Divide)',
      image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    },
  },
  {
    song_id: 8,
    id: 8,
    title: 'positions',
    name: 'positions',
    duration: 172,
    duration_ms: 172000,
    image: 'https://i.scdn.co/image/ab67616d0000b27389992f4d7d4ab94937bf9e23',
    preview_url: 'https://p.scdn.co/mp3-preview/positions',
    artist_id: 6,
    album_id: 6,
    artists: [{ id: 6, name: 'Ariana Grande' }],
    album: {
      id: 6,
      name: 'Positions',
      image: 'https://i.scdn.co/image/ab67616d0000b27389992f4d7d4ab94937bf9e23',
    },
  },
  {
    song_id: 9,
    id: 9,
    title: 'Save Your Tears',
    name: 'Save Your Tears',
    duration: 215,
    duration_ms: 215000,
    image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    preview_url: 'https://p.scdn.co/mp3-preview/tears',
    artist_id: 1,
    album_id: 1,
    artists: [{ id: 1, name: 'The Weeknd' }],
    album: {
      id: 1,
      name: 'After Hours',
      image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    },
  },
  {
    song_id: 10,
    id: 10,
    title: 'Lavender Haze',
    name: 'Lavender Haze',
    duration: 202,
    duration_ms: 202000,
    image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    preview_url: 'https://p.scdn.co/mp3-preview/lavender',
    artist_id: 2,
    album_id: 2,
    artists: [{ id: 2, name: 'Taylor Swift' }],
    album: {
      id: 2,
      name: 'Midnights',
      image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    },
  },
];

export const mockAlbums = [
  {
    album_id: 1,
    id: 1,
    name: 'After Hours',
    title: 'After Hours',
    image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
    release_date: '2020-03-20',
    total_tracks: 14,
    type: 'album',
    artist_id: mockArtists[0],
    artists: [mockArtists[0]],
  },
  {
    album_id: 2,
    id: 2,
    name: 'Midnights',
    title: 'Midnights',
    image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
    release_date: '2022-10-21',
    total_tracks: 13,
    type: 'album',
    artist_id: mockArtists[1],
    artists: [mockArtists[1]],
  },
  {
    album_id: 3,
    id: 3,
    name: 'Views',
    title: 'Views',
    image: 'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
    release_date: '2016-04-29',
    total_tracks: 20,
    type: 'album',
    artist_id: mockArtists[2],
    artists: [mockArtists[2]],
  },
  {
    album_id: 4,
    id: 4,
    name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    title: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    image: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
    release_date: '2019-03-29',
    total_tracks: 14,
    type: 'album',
    artist_id: mockArtists[3],
    artists: [mockArtists[3]],
  },
  {
    album_id: 5,
    id: 5,
    name: '÷ (Divide)',
    title: '÷ (Divide)',
    image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    release_date: '2017-03-03',
    total_tracks: 16,
    type: 'album',
    artist_id: mockArtists[4],
    artists: [mockArtists[4]],
  },
  {
    album_id: 6,
    id: 6,
    name: 'Positions',
    title: 'Positions',
    image: 'https://i.scdn.co/image/ab67616d0000b27389992f4d7d4ab94937bf9e23',
    release_date: '2020-10-30',
    total_tracks: 14,
    type: 'album',
    artist_id: mockArtists[5],
    artists: [mockArtists[5]],
  },
];

export const mockPlaylists = [
  {
    playlist_id: 1,
    id: 1,
    name: "Today's Top Hits",
    title: "Today's Top Hits",
    description: 'The hottest tracks right now',
    image: 'https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc',
    total_tracks: 50,
    owner: { id: 1, name: 'Spotify', display_name: 'Spotify' },
    owner_id: 1,
    public: true,
    followers: 35000000,
  },
  {
    playlist_id: 2,
    id: 2,
    name: 'RapCaviar',
    title: 'RapCaviar',
    description: 'New music from Lil Baby, Polo G and more',
    image: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
    total_tracks: 50,
    owner: { id: 1, name: 'Spotify', display_name: 'Spotify' },
    owner_id: 1,
    public: true,
    followers: 15000000,
  },
  {
    playlist_id: 3,
    id: 3,
    name: 'Peaceful Piano',
    title: 'Peaceful Piano',
    description: 'Relax and indulge with beautiful piano pieces',
    image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6',
    total_tracks: 200,
    owner: { id: 1, name: 'Spotify', display_name: 'Spotify' },
    owner_id: 1,
    public: true,
    followers: 8000000,
  },
  {
    playlist_id: 4,
    id: 4,
    name: 'Rock Classics',
    title: 'Rock Classics',
    description: 'Rock legends & epic songs',
    image: 'https://i.scdn.co/image/ab67706f00000002e5a0ee5df234da19d0e8de98',
    total_tracks: 100,
    owner: { id: 1, name: 'Spotify', display_name: 'Spotify' },
    owner_id: 1,
    public: true,
    followers: 12000000,
  },
  {
    playlist_id: 5,
    id: 5,
    name: 'Chill Hits',
    title: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    image: 'https://i.scdn.co/image/ab67706f00000002a3f02281e676f1ccda3862f6',
    total_tracks: 150,
    owner: { id: 1, name: 'Spotify', display_name: 'Spotify' },
    owner_id: 1,
    public: true,
    followers: 10000000,
  },
  {
    playlist_id: 6,
    id: 6,
    name: 'My Favorites',
    title: 'My Favorites',
    description: 'Your favorite tracks',
    image: 'https://i.scdn.co/image/ab67706c0000da84b4a0ccb933e01d11d784c9d3',
    total_tracks: 25,
    owner: { id: 100, name: 'You', display_name: 'You' },
    owner_id: 100,
    public: false,
    followers: 1,
  },
];

export const mockUsers = [
  {
    user_id: 100,
    id: 100,
    username: 'music_lover',
    display_name: 'Music Lover',
    email: 'user@example.com',
    image: 'https://i.pravatar.cc/300?img=1',
    followers: 120,
    following: 85,
    user_info: {
      is_staff: false,
      display_name: 'Music Lover',
      image: 'https://i.pravatar.cc/300?img=1',
    },
  },
  {
    user_id: 101,
    id: 101,
    username: 'admin',
    display_name: 'Admin User',
    email: 'admin@example.com',
    image: 'https://i.pravatar.cc/300?img=2',
    followers: 5000,
    following: 200,
    user_info: {
      is_staff: true,
      display_name: 'Admin User',
      image: 'https://i.pravatar.cc/300?img=2',
    },
  },
  {
    user_id: 102,
    id: 102,
    username: 'jane_doe',
    display_name: 'Jane Doe',
    email: 'jane@example.com',
    image: 'https://i.pravatar.cc/300?img=5',
    followers: 250,
    following: 150,
    user_info: {
      is_staff: false,
      display_name: 'Jane Doe',
      image: 'https://i.pravatar.cc/300?img=5',
    },
  },
];

export const mockChatRooms = [
  {
    id: 1,
    name: 'Music Discussion',
    participants: [mockUsers[0], mockUsers[2]],
    last_message: {
      content: 'Hey! Did you listen to the new album?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      sender_id: 102,
    },
  },
  {
    id: 2,
    name: 'Playlist Ideas',
    participants: [mockUsers[0], mockUsers[1]],
    last_message: {
      content: 'I found some great new tracks!',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      sender_id: 101,
    },
  },
];

// Helper functions to get mock data by ID
export const getMockAlbum = (id) => {
  const album = mockAlbums.find((a) => a.id === parseInt(id) || a.album_id === parseInt(id));
  if (!album) return mockAlbums[0];
  
  const songs = mockSongs.filter((s) => s.album_id === album.id);
  
  return {
    album,
    songs,
  };
};

export const getMockArtist = (id) => {
  const artist = mockArtists.find((a) => a.id === parseInt(id) || a.artist_id === parseInt(id));
  if (!artist) return { artist: mockArtists[0], songs: mockSongs.slice(0, 5), albums: mockAlbums.slice(0, 3), is_following: false };
  
  const songs = mockSongs.filter((s) => s.artist_id === artist.id);
  const albums = mockAlbums.filter((a) => a.artist_id.id === artist.id);
  
  return {
    artist,
    songs,
    albums,
    is_following: Math.random() > 0.5,
  };
};

export const getMockPlaylist = (id) => {
  const playlist = mockPlaylists.find((p) => p.id === parseInt(id) || p.playlist_id === parseInt(id));
  if (!playlist) return { playlist: mockPlaylists[0], songs: mockSongs.slice(0, 10), is_owner: false };
  
  // Return random songs for the playlist
  const songs = [...mockSongs].sort(() => 0.5 - Math.random()).slice(0, Math.min(playlist.total_tracks, 10));
  
  return {
    playlist,
    songs,
    is_owner: playlist.owner_id === 100,
  };
};

export const getMockUser = (id) => {
  const user = mockUsers.find((u) => u.id === parseInt(id) || u.user_id === parseInt(id));
  if (!user) return { user: mockUsers[0], playlists: mockPlaylists.slice(0, 3) };
  
  const playlists = mockPlaylists.filter((p) => p.owner_id === user.id).slice(0, 5);
  
  return {
    user,
    playlists,
  };
};

export const getMockSearchResults = (query) => {
  const lowerQuery = query.toLowerCase();
  
  return {
    songs: mockSongs.filter((s) => 
      s.title.toLowerCase().includes(lowerQuery) || 
      s.name.toLowerCase().includes(lowerQuery)
    ),
    artists: mockArtists.filter((a) => 
      a.name.toLowerCase().includes(lowerQuery)
    ),
    albums: mockAlbums.filter((a) => 
      a.name.toLowerCase().includes(lowerQuery) || 
      a.title.toLowerCase().includes(lowerQuery)
    ),
    playlists: mockPlaylists.filter((p) => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.title.toLowerCase().includes(lowerQuery)
    ),
    users: mockUsers.filter((u) => 
      u.username.toLowerCase().includes(lowerQuery) || 
      u.display_name.toLowerCase().includes(lowerQuery)
    ),
  };
};

export const getMockLikedSongs = () => {
  return mockSongs.slice(0, 8).map((song) => ({
    track: {
      ...song,
      added_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  }));
};

export const getMockLibrary = () => {
  return {
    myLikeSongs: mockSongs.slice(0, 8),
    myPlaylists: mockPlaylists.filter((p) => p.owner_id === 100),
    myArtists: mockArtists.slice(0, 4),
  };
};
