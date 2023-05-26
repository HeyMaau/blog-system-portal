import {CODE_IP_BLOCKED} from "./constants";

export default function (context) {
  context.$axios.onResponse(response => {
    if (response.data.code === CODE_IP_BLOCKED) {
      context.error({
        statusCode: 403,
        message: '系统繁忙，请稍后再试'
      })
    }
  })
}
