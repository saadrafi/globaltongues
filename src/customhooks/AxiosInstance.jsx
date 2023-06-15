import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/provider/AuthProvider";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const AxiosInstance = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers["Authorization"] = token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          navigate("/");
        }
        return error;
      }
    );
  }, [navigate]);
  return axiosInstance;
};

export default AxiosInstance;
