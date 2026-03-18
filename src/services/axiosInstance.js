import axios from "axios";
import { message } from "antd";

const axiosInstace = axios.create({
    baseURL: "http://localhost:5000/api",
});

axiosInstace.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstace.interceptors.response.use(
    (response) => {
        const toast = response?.config?.toast;

        if (toast?.success) {
            message.open({
                type: "success",
                content: toast.success,
            });
        }

        return response;
    },
    (error) => {
        const toast = error?.config?.toast;

        if (toast?.error !== false) {
            const errorMessage =
                typeof toast?.error === "string"
                    ? toast.error
                    : error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";

            message.open({
                type: "error",
                content: errorMessage,
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstace;