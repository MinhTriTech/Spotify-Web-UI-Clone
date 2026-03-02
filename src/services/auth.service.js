import axiosInstace from "./axiosInstance";

export const login = async (data) => {
    const res = await axiosInstace.post(`/auth/login`, {
        username: data.username,
        password: data.password,
    });
    return res.data;
};

export const register = async (data) => {
    const res = await axios.post(`${API_URL}/register`, data);
    return res;
}

export const getMe = async () => {
    const res = await axiosInstace.get("/user/me");
    return res.data;
};