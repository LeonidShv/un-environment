import type { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import type { IParamsEnvironment } from "@/pages/Dashboard/interfaces/environment.ts";

export default {
  readEnvironment: (
    element: string,
    country: string,
    params: IParamsEnvironment,
  ): Promise<AxiosResponse<any>> =>
    api.get(`/.${element}.${country}./ALL/`, { params }),
};
