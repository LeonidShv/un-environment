import { api } from "@/lib/axios";
import type { IParamsEnvironment } from '@/interfaces/common'

export default {
  readEnvironment: (
    element: string,
    country: string, 
    params: IParamsEnvironment
  ) => api.get(`/.${element}.${country}./ALL/`, { params })
};
