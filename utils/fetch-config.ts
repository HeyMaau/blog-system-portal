import {FetchConstants} from "~/utils/NewConstants";
import {CODE_IP_BLOCKED} from "~/utils/constants";
import {createError} from "#app/composables/error";


export function getFetchConfig(method: string, params: object | null, body: object | null): object {
  return {
    method,
    params,
    body,
    timeout: FetchConstants.TIME_OUT,
    retry: 3,
    retryDelay: 500,
    baseURL: import.meta.env.VITE_PUBLIC_SERVER_BASE_URL,
    // @ts-ignore
    async onResponse({request, response, options}) {
      if (response._data.code === CODE_IP_BLOCKED) {
        throw createError({
          statusCode: 403,
          statusMessage: '系统繁忙，请稍后再试',
          fatal: true
        })
      }
    }
  }
}
