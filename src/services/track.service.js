import axiosInstance from "./axiosInstance";

export const getRandomTrack = async (limit) => {
    const query = limit ? `?limit=${limit}` : "";
    const res = await axiosInstance.get(`/tracks/randomTracks${query}`);
    return res.data;
};

