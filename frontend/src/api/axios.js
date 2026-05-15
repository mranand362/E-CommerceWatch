import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commercewatch.onrender.com/api",
  withCredentials: true,
});

export default API;