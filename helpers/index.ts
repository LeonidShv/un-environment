import { useEventBus, useDebounceFn } from "@vueuse/core";
import { debounceTime } from "@/constants";

const { emit } = useEventBus("vue-use-event-bus");

export const showNotification = useDebounceFn((errors) => {
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
}, debounceTime);
