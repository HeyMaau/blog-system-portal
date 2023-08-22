import env from '../env'

export const ARTICLE_SUMMARY_LENGTH = 200
export const CODE_SUCCESS = 20000
export const CODE_IP_BLOCKED = 40016
export const URL_IMAGE = `${env[process.env.NODE_ENV].URL_SERVER}/image/`
export const EMOJI_NUM_PER_PAGE = 45

export const COMMENT_TYPE_ARTICLE = '0'
export const COMMENT_TYPE_THINKING = '1'
