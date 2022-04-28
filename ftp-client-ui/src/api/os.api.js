import http from '../util/http'

export async function resolve(pathSegments) {
  return http
    .request({
      url: '/os/resolve',
      method: 'POST',
      data: pathSegments
    })
    .then(response => response.data)
}

export default { resolve }
