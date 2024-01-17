import { api } from "@/lib/axios";
import type { AxiosResponse } from 'axios';
import type { IParamsEnvironment } from '@/interfaces/common'

export default {
  readEnvironment: (
    element: string,
    country: string, 
    params: IParamsEnvironment
  ): Promise<AxiosResponse<any>> => api.get(`/.${element}.${country}./ALL/`, { params })
};
