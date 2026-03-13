import axiosInstance from "./axiosInstance";

export const getPlaylists = async () => {
    const res = await axiosInstance.get("/playlist");
    return res.data;
};

export const getPlaylistById = async (playlistId) => {
    const res = await axiosInstance.get(`/playlist/${playlistId}`);
    return res.data;
};

export const createPlaylist = async (data) => {
    const res = await axiosInstance.post("/playlist", data);
    return res.data;
};

export const getTracks = async (playlistId) => {
    const res = await axiosInstance.get(`/tracks/${playlistId}`);
    return res.data;
};

export const createTrack = async (playlistId, data) => {
    const res = await axiosInstance.post(`/tracks/${playlistId}`, data);
    return res.data;
}

export const addTrackToPlaylist = async (playlistId, trackId) => {
    const res = await axiosInstance.post(`/playlist/${playlistId}/tracks`, {
        "trackId": trackId,
    });
    return res.data;
}

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
    const res = await axiosInstance.delete(`/playlist/${playlistId}/tracks/${trackId}`);
    return res.data;
}

export const updatePlaylist = async (playlistId, data) => {
    const res = await axiosInstance.patch(`/playlist/${playlistId}`, data);
    return res.data;
}