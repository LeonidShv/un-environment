import axios from "axios";
import { showNotification } from "@/helpers";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL},${
    import.meta.env.VITE_BACKEND_VERSION
  }`,
});

const errors: string[] = [];

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    errors.push(`Message: ${error.message}. Code: ${error.code}`);
    showNotification(errors);

    return Promise.reject(error);
  },
);
