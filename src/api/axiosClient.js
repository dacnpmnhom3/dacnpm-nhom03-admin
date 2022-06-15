import axios from "axios";
import { store } from "../redux/store";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL2,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + store.getState().user.token;
    return config;
  },
  (error) => {
    throw error;
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const adminAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {"Access-Control-Allow-Origin": "*"}
});

adminAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + store.getState().user.token;
    return config;
  },
  (error) => {
    throw error;
  }
);

adminAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosClient, adminAxios };
