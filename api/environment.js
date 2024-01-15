import { api } from "@/lib/axios";

export default {
  readEnvironment: (element, country, params) => api.get(`/.${element}.${country}./ALL/`, { params })
};
