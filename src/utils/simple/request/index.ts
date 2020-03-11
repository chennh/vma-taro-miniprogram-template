import { RequestFactory, RequestOptions } from '../../request'

/**
 * 接口请求
 * @param options                    RequestOptions
 */
export const axios = (options: RequestOptions): Promise<any> => {
  return RequestFactory.createRequest(options)
}