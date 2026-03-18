import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
    const res = await axiosInstance.get(`/me`);
    return res.data;
};

export const getUserProfile = async (id) => {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
};

export const getRandomUser = async (limit) => {
    const query = Number.isFinite(limit) && limit > 0 ? `?limit=${limit}` : "";
    const res = await axiosInstance.get(`/user/randomUsers${query}`, {
        toast: {
            error: false,
        },
    });
    return res.data;
};