import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 40000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);
export default instance;
