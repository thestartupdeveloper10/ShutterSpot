import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// http://localhost:5000
// Function to get the current user's token
const getCurrentUserToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const { user } = JSON.parse(persistRoot);
    if (user) {
      const { currentUser } = JSON.parse(user);
      return currentUser?.token;
    }
  }
  return null;
};

// Get the token
const TOKEN = getCurrentUserToken();

console.log('token', TOKEN);


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

// Interceptor to update the token if it changes
userRequest.interceptors.request.use((config) => {
  const token = getCurrentUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

userRequest.interceptors.request.use((config) => {
  console.log("Headers before request:", config.headers);
  return config;
});
