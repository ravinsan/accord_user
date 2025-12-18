import { API_URL } from "@/config";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Request interceptor → token attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        window.location.replace("/login");
      }, 500);
    }

    return Promise.reject(error);
  }
);

export default api;
