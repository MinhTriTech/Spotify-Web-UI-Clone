// Mock data for Spotify clone offline demo

// Users data
export const users = [
  {
    id: 1,
    username: "demo_user",
    email: "demo@example.com",
    display_name: "Demo User",
    profile_image: "/images/User/default-avatar.png",
    followers: 120,
    following: 85,
    country: "VN",
    role: "user",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    display_name: "Admin User",
    profile_image: "/images/Admin/admin-avatar.png",
    followers: 500,
    following: 200,
    country: "VN",
    role: "admin",
    created_at: "2023-01-01T00:00:00Z"
  }
];

// Artists data
export const artists = [
  {
    id: 1,
    name: "The Weeknd",
    image: "/images/artists/weeknd.jpg",
    followers: 95000000,
    genres: ["pop", "r&b"],
    bio: "The Weeknd is a Canadian singer, songwriter, and record producer.",
    verified: true,
    top_tracks: [1, 2, 3]
  },
  {
    id: 2,
    name: "Taylor Swift",
    image: "/images/artists/taylor.jpg",
    followers: 120000000,
    genres: ["pop", "country"],
    bio: "Taylor Swift is an American singer-songwriter.",
    verified: true,
    top_tracks: [4, 5, 6]
  },
  {
    id: 3,
    name: "Drake",
    image: "/images/artists/drake.jpg",
    followers: 85000000,
    genres: ["hip hop", "rap"],
    bio: "Drake is a Canadian rapper, singer, and songwriter.",
    verified: true,
    top_tracks: [7, 8, 9]
  },
  {
    id: 4,
    name: "Billie Eilish",
    image: "/images/artists/billie.jpg",
    followers: 70000000,
    genres: ["alternative", "pop"],
    bio: "Billie Eilish is an American singer-songwriter.",
    verified: true,
    top_tracks: [10, 11, 12]
  },
  {
    id: 5,
    name: "Ed Sheeran",
    image: "/images/artists/ed.jpg",
    followers: 60000000,
    genres: ["pop", "folk"],
    bio: "Ed Sheeran is an English singer-songwriter.",
    verified: true,
    top_tracks: [13, 14, 15]
  }
];

// Albums data
export const albums = [
  {
    id: 1,
    title: "After Hours",
    artist_id: 1,
    artist_name: "The Weeknd",
    image: "/images/albums/after-hours.jpg",
    release_date: "2020-03-20",
    total_tracks: 14,
    duration: 3360, // in seconds
    genres: ["pop", "r&b"],
    label: "XO/Republic",
    tracks: [1, 2, 3]
  },
  {
    id: 2,
    title: "Midnights",
    artist_id: 2,
    artist_name: "Taylor Swift",
    image: "/images/albums/midnights.jpg",
    release_date: "2022-10-21",
    total_tracks: 13,
    duration: 2640,
    genres: ["pop", "electropop"],
    label: "Republic",
    tracks: [4, 5, 6]
  },
  {
    id: 3,
    title: "Certified Lover Boy",
    artist_id: 3,
    artist_name: "Drake",
    image: "/images/albums/clb.jpg",
    release_date: "2021-09-03",
    total_tracks: 21,
    duration: 5160,
    genres: ["hip hop", "rap"],
    label: "OVO Sound",
    tracks: [7, 8, 9]
  },
  {
    id: 4,
    title: "Happier Than Ever",
    artist_id: 4,
    artist_name: "Billie Eilish",
    image: "/images/albums/hte.jpg",
    release_date: "2021-07-30",
    total_tracks: 16,
    duration: 3360,
    genres: ["alternative", "pop"],
    label: "Interscope",
    tracks: [10, 11, 12]
  },
  {
    id: 5,
    title: "Divide",
    artist_id: 5,
    artist_name: "Ed Sheeran",
    image: "/images/albums/divide.jpg",
    release_date: "2017-03-03",
    total_tracks: 12,
    duration: 2880,
    genres: ["pop", "folk"],
    label: "Asylum",
    tracks: [13, 14, 15]
  }
];

// Songs data
export const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist_id: 1,
    artist_name: "The Weeknd",
    album_id: 1,
    album_name: "After Hours",
    duration: 200,
    image: "/images/albums/after-hours.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    video: null,
    explicit: false,
    popularity: 95,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    track_number: 1
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist_id: 1,
    artist_name: "The Weeknd", 
    album_id: 1,
    album_name: "After Hours",
    duration: 215,
    image: "/images/albums/after-hours.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    video: null,
    explicit: false,
    popularity: 89,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    track_number: 2
  },
  {
    id: 3,
    title: "After Hours",
    artist_id: 1,
    artist_name: "The Weeknd",
    album_id: 1,
    album_name: "After Hours", 
    duration: 361,
    image: "/images/albums/after-hours.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    video: null,
    explicit: true,
    popularity: 82,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    track_number: 3
  },
  {
    id: 4,
    title: "Anti-Hero",
    artist_id: 2,
    artist_name: "Taylor Swift",
    album_id: 2,
    album_name: "Midnights",
    duration: 200,
    image: "/images/albums/midnights.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    video: null,
    explicit: false,
    popularity: 93,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    track_number: 1
  },
  {
    id: 5,
    title: "Midnight Rain", 
    artist_id: 2,
    artist_name: "Taylor Swift",
    album_id: 2,
    album_name: "Midnights",
    duration: 174,
    image: "/images/albums/midnights.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    video: null,
    explicit: false,
    popularity: 87,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    track_number: 2
  },
  {
    id: 6,
    title: "Lavender Haze",
    artist_id: 2,
    artist_name: "Taylor Swift",
    album_id: 2,
    album_name: "Midnights",
    duration: 202,
    image: "/images/albums/midnights.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    video: null,
    explicit: false,
    popularity: 85,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    track_number: 3
  },
  {
    id: 7,
    title: "Way 2 Sexy",
    artist_id: 3,
    artist_name: "Drake",
    album_id: 3,
    album_name: "Certified Lover Boy",
    duration: 267,
    image: "/images/albums/clb.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    video: null,
    explicit: true,
    popularity: 88,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    track_number: 1
  },
  {
    id: 8,
    title: "Girls Want Girls",
    artist_id: 3,
    artist_name: "Drake",
    album_id: 3,
    album_name: "Certified Lover Boy",
    duration: 221,
    image: "/images/albums/clb.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    video: null,
    explicit: true,
    popularity: 83,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    track_number: 2
  },
  {
    id: 9,
    title: "Fair Trade",
    artist_id: 3,
    artist_name: "Drake",
    album_id: 3,
    album_name: "Certified Lover Boy",
    duration: 290,
    image: "/images/albums/clb.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    video: null,
    explicit: false,
    popularity: 79,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    track_number: 3
  },
  {
    id: 10,
    title: "Happier Than Ever",
    artist_id: 4,
    artist_name: "Billie Eilish",
    album_id: 4,
    album_name: "Happier Than Ever",
    duration: 298,
    image: "/images/albums/hte.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    video: null,
    explicit: false,
    popularity: 90,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    track_number: 1
  },
  {
    id: 11,
    title: "Therefore I Am",
    artist_id: 4,
    artist_name: "Billie Eilish",
    album_id: 4,
    album_name: "Happier Than Ever",
    duration: 154,
    image: "/images/albums/hte.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    video: null,
    explicit: false,
    popularity: 86,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    track_number: 2
  },
  {
    id: 12,
    title: "My Future",
    artist_id: 4,
    artist_name: "Billie Eilish",
    album_id: 4,
    album_name: "Happier Than Ever",
    duration: 210,
    image: "/images/albums/hte.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    video: null,
    explicit: false,
    popularity: 81,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    track_number: 3
  },
  {
    id: 13,
    title: "Shape of You",
    artist_id: 5,
    artist_name: "Ed Sheeran",
    album_id: 5,
    album_name: "Divide",
    duration: 233,
    image: "/images/albums/divide.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    video: null,
    explicit: false,
    popularity: 94,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    track_number: 1
  },
  {
    id: 14,
    title: "Perfect",
    artist_id: 5,
    artist_name: "Ed Sheeran",
    album_id: 5,
    album_name: "Divide",
    duration: 263,
    image: "/images/albums/divide.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    video: null,
    explicit: false,
    popularity: 92,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    track_number: 2
  },
  {
    id: 15,
    title: "Thinking Out Loud",
    artist_id: 5,
    artist_name: "Ed Sheeran",
    album_id: 5,
    album_name: "Divide",
    duration: 281,
    image: "/images/albums/divide.jpg",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    video: null,
    explicit: false,
    popularity: 89,
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    track_number: 3
  }
];

// Playlists data
export const playlists = [
  {
    id: 1,
    title: "Liked Songs",
    description: "Your favorite songs",
    owner_id: 1,
    owner_name: "Demo User",
    image: "/images/playlists/liked-songs.jpg",
    is_public: false,
    followers: 1,
    total_tracks: 5,
    songs: [1, 4, 7, 10, 13],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    title: "My Playlist #1",
    description: "Demo playlist for testing",
    owner_id: 1,
    owner_name: "Demo User",
    image: "/images/playlists/default.jpg",
    is_public: true,
    followers: 25,
    total_tracks: 8,
    songs: [1, 2, 4, 5, 7, 8, 10, 13],
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z"
  },
  {
    id: 3,
    title: "Chill Vibes",
    description: "Relaxing music for any time",
    owner_id: 1,
    owner_name: "Demo User",
    image: "/images/playlists/chill.jpg",
    is_public: true,
    followers: 150,
    total_tracks: 6,
    songs: [2, 5, 11, 12, 14, 15],
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z"
  },
  {
    id: 4,
    title: "Top Hits 2024",
    description: "The biggest songs of 2024",
    owner_id: 2,
    owner_name: "Admin User",
    image: "/images/playlists/top-hits.jpg",
    is_public: true,
    followers: 5000,
    total_tracks: 10,
    songs: [1, 3, 4, 6, 7, 9, 10, 11, 13, 14],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-30T00:00:00Z"
  }
];

// Chat rooms data
export const chatRooms = [
  {
    id: 1,
    name: "General Chat",
    participants: [1, 2],
    last_message: {
      id: 3,
      content: "How are you doing?",
      sender_id: 2,
      timestamp: "2024-01-30T10:30:00Z"
    },
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Messages data
export const messages = [
  {
    id: 1,
    chatroom_id: 1,
    sender_id: 1,
    content: "Hello! Welcome to the chat!",
    timestamp: "2024-01-30T10:00:00Z"
  },
  {
    id: 2,
    chatroom_id: 1,
    sender_id: 2,
    content: "Hi there! Thanks for the welcome!",
    timestamp: "2024-01-30T10:15:00Z"
  },
  {
    id: 3,
    chatroom_id: 1,
    sender_id: 2,
    content: "How are you doing?",
    timestamp: "2024-01-30T10:30:00Z"
  }
];

// User preferences and states
export const userStates = {
  likedSongs: [1, 4, 7, 10, 13],
  followedArtists: [1, 2, 3],
  followedPlaylists: [2, 3, 4],
  recentlyPlayed: [1, 4, 7, 10],
  searchHistory: ['The Weeknd', 'Taylor Swift', 'pop music', 'chill songs']
};

// Suggested content
export const suggestions = {
  recentlyPlayed: [
    { type: 'song', item: songs[0] },
    { type: 'album', item: albums[1] },
    { type: 'playlist', item: playlists[1] }
  ],
  madeForYou: [
    playlists[2],
    playlists[3]
  ],
  popularArtists: artists.slice(0, 3),
  newReleases: albums.slice(0, 3)
};