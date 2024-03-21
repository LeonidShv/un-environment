import type { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import type { IParamsEnvironment } from "@/pages/Dashboard/interfaces/environment.ts";

export default {
  readEnvironment: (
    element: string,
    country: string,
    params: IParamsEnvironment,
  ): Promise<AxiosResponse<any>> => {
    try {
      return api.get(`asdasd/.${element}.${country}./ALL/`, { params });
    } catch (e) {
      return {};
    }
  },
};
