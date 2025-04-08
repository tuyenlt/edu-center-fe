import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "./authContext";

import api from "@/services/api";


export default function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/users/me");
                setUser(response.data);
                setIsAuthenticated(true);
                console.log("fetch user success");
            } catch {
                console.log("fetch user fail");
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        console.log("Token changed:", token);
    }, [token]);

    useEffect(() => {
        console.log("User authenticated:", isAuthenticated);
    }, [isAuthenticated]);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization =
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization
            console.log(`set auth header: Bearer ${token}`)
            return config
        })
        return () => {
            api.interceptors.request.eject(authInterceptor)
        }

    }, [token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response, async (error) => {
                const originalRequest = error.config

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "/users/refresh-token"
                ) {
                    originalRequest._retry = true;

                    try {
                        const response = await api.post(
                            "/users/refresh-token",
                            {},
                            { withCredentials: true }
                        );
                        console.log("refresh token success");

                        const newAccessToken = response.data.accessToken;
                        setToken(newAccessToken);

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        return api(originalRequest);
                    } catch (err) {
                        console.error("Refresh token failed:", err);

                        setToken(null);
                        setUser(null);
                        setIsAuthenticated(false);
                        navigate("/login", { replace: true });

                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error)
            })

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    const login = async (email, password) => {
        try {
            const response = await api.post("/users/login", { email, password });
            const accessToken = response.data.accessToken;
            console.log("login success")
            setToken(accessToken);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const register = async (userInfo) => {
        try {
            await api.post("/users/register", userInfo);
            await login(userInfo.email, userInfo.password);
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = async () => {
        await api.delete('/users/logout')
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    const values = {
        user,
        isAuthenticated,
        token,
        login,
        logout,
        register,
        loading
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

