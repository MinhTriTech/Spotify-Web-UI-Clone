import axiosInstance from "./axiosInstance";

export const search = async (query, type) => {
    const res = await axiosInstance.get("/search", {
        params: {
            q: query,
            type: type
        }
    });
    return res.data;
};