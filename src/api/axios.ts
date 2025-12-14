import { API_URL } from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
//   withCredentials: true, // agar sanctum / cookies use kar rahe ho
});

export default api;
