// src/lib/api.ts

import axios from "axios"

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8002"

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Something went wrong"

    return Promise.reject(new Error(message))
  }
)