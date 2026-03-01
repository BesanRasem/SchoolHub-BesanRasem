import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let accessToken = null;

export const setAxiosToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/login") &&
      !originalRequest.url.includes("/users/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/users/auth/refresh");

        if (res.data?.accessToken) {
          setAxiosToken(res.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;