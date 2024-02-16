import axios from "axios";
import { useEventBus, useDebounceFn } from "@vueuse/core";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL},${
    import.meta.env.VITE_BACKEND_VERSION
  }`,
});

const errors: string[] = [];
const { emit } = useEventBus("vue-use-event-bus");

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

const showNotification = useDebounceFn((errors) => {
  const uniqueErrors: string[] = Array.from(new Set(errors));

  uniqueErrors.forEach((errorMessage) => {
    emit({
      type: "error",
      title: "Error",
      message: errorMessage,
      position: "bottom-right",
    });
  });

  errors = [];
}, 750);
