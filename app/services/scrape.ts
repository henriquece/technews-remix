import type { ResponseInterceptor } from '~/config/request'
import request from '~/config/request'

export const getSiteHtml = async (url: string) =>
  request.get<unknown, ResponseInterceptor<string>>(url)
