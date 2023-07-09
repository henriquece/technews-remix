import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

export type ResponseInterceptor<T> = {
  success: boolean
} & AxiosResponse<T>

const request = axios.create()

request.interceptors.response.use(
  (response) => {
    return { ...response, success: true }
  },
  () => {
    return { success: false }
  }
)

export default request as AxiosInstance
