import axiosInstance from "./axiosInstance";

export const getPlaylists = async () => {
    const res = await axiosInstance.get("/playlists");
    return res.data;
};

export const createPlaylist = async (data) => {
    const res = await axiosInstance.post("/playlists", data);
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