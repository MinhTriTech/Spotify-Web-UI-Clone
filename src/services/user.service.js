import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
    const res = await axiosInstance.get(`/me`);
    return res.data;
};

export const getUserProfile = async (id) => {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
};

