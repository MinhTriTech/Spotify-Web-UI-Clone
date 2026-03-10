import axiosInstance from "./axiosInstance";

export const getRandomTrack = async (limit) => {
    const res = await axiosInstance.get(`/tracks/randomTracks?${limit}`);
    return res.data;
};

