import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8082', // The Spring Boot backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach an interceptor for authentication tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // The backend login method returns "Bearer <token>", so we can just set it directly.
    // If it only returned the token, we would do `Bearer ${token}`.
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
});

export default api;
