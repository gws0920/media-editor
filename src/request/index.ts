import req, { Method } from './request'

const api = (url:string, method?:Method) => 
  (body?:BodyInit|null|undefined, headers?:Headers) => req(url, method, body, headers)

const API = {
  'test': api('/test')
}

export default API