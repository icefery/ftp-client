import axios from 'axios'

import { HTTP_BASE_URL } from '../config'

const http = axios.create({ baseURL: HTTP_BASE_URL })

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default http
