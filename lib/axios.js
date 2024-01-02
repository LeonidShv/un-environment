import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL},${
    import.meta.env.VITE_BACKEND_VERSION
  }`,
});
