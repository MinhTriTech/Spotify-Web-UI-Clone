import axiosInstace from "./axiosInstance";

export const login = async (data) => {
    const res = await axiosInstace.post(`/auth/login`, {
        username: data.username,
        password: data.password,
    });
    return res.data;
};

export const register = async (data) => {
    const res = await axiosInstace.post("/auth/register", data);
    return res.data;
};

export const loginWithGoogle = async (payload) => {
    const res = await axiosInstace.post("/auth/google", payload);
    return res.data;
};

export const getMe = async () => {
    const res = await axiosInstace.get("/user/me");
    return res.data;
};