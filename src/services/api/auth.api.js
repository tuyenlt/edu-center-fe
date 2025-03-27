import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email: email,
            password: password,
        });

        const { accessToken, refreshToken } = response.data;

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        return accessToken;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};


export const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/users/refresh-token`, { withCredentials: true });

        const { accessToken } = response.data;

        console.log("Access Token:", accessToken);

        return accessToken;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};


export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/refresh-token`, { withCredentials: true });

        const { accessToken } = response.data;

        console.log("Access Token:", accessToken);

        return accessToken;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
}