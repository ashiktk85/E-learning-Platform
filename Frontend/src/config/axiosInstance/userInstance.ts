import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const url = "https://api.kevinhills.shop";
const userAxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");


    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
// console.log(config);


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${url}/refresh-token`, {}, {
          withCredentials: true,
        });

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return userAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default userAxiosInstance;
