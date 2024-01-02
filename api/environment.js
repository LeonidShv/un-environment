import { api } from "@/lib/axios";

export default {
  readEnvironment: (element, country) => api.get(`/.${element}.${country}./ALL/?detail=full&startPeriod=1960-01-01&endPeriod=2020-12-31&dimensionAtObservation=TIME_PERIOD`)
};
