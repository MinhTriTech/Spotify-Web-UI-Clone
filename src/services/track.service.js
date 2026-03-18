import axiosInstance from "./axiosInstance";

export const getRandomTrack = async (limit) => {
    const query = limit ? `?limit=${limit}` : "";
    const res = await axiosInstance.get(`/tracks/randomTracks${query}`);
    return res.data;
};

export const hiddenUploadTrack = async (formData) => {
    const res = await axiosInstance.post("/tracks/_hidden/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        toast: {
            success: "Upload bài hát thành công",
        },
    });

    return res.data;
};

