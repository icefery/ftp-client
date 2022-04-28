import axios from 'axios'

import { HTTP_BASE_URL } from '../config'

const http = axios.create({ baseURL: HTTP_BASE_URL })

http.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      console.log(response.data)
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default http
