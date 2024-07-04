import axios from "axios";
const local_api = "http://localhost:8000";
const production_api = "http://localhost:8000";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: local_api,
  headers: {
    Authorization: token ? `Bearar ${token}` : "",
  },
  withCredentials: true,
});

export default api;
