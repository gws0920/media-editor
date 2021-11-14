export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
const isMock = true
const baseUrl = isMock ? 'http://localhost:3000' : ''
export default function req(url:string, method?:Method, body?:BodyInit|null|undefined, headers?:Headers, ) {
  return fetch(`${baseUrl}${url}`, {
    method: method || Method.GET,
    body,
    headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('返回没有ok'))
  }).then(res => {
    if (res.code === 200) {
      return res.data
    }
    console.error(`返回错误：${res.code}`, res);
    return Promise.reject(new Error(res.err || res.message))
  }).catch(err => {
    console.error('出错了', err);
    return Promise.reject(new Error(err))
  })
}