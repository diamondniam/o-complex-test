import axios from "axios";
import { stringify } from "qs";

export const useAxios = axios.create({
  paramsSerializer: {
    serialize: (params) =>
      stringify(params, {
        encode: false,
        allowDots: true,
        skipNulls: true,
      }),
  },
});

useAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network Error:", error.message);
    } else if (error.response.status === 401) {
      console.error("Authorization Error:", error.response.data);
    } else if (error.response.status === 403) {
      console.error("Forbidden:", error.response.data);
    } else if (error.response.status >= 400 && error.response.status < 500) {
      console.error("Client Error:", error.response.data);
    } else if (error.response.status >= 500) {
      console.error("Server Error:", error.response.data);
    } else if (axios.isCancel(error)) {
      console.error("Request cancelled:", error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }

    return Promise.reject(error);
  }
);
