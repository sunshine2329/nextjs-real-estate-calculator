import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { isEmpty, merge, assign } from 'lodash'

export interface AxiosInstanceConfigureType {
  baseURL: string
  headers?: object
  rest?: any
}
const singletonEnforcer = Symbol()

class Axios {
  private axiosClient: AxiosInstance
  static axiosInstance: Axios

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance')
    }

    this.axiosClient = axios.create()
  }

  static get instance() {
    if (!this.axiosInstance) {
      this.axiosInstance = new Axios(singletonEnforcer)
    }

    return this.axiosInstance
  }

  setConfigure(configure: AxiosInstanceConfigureType) {
    const { baseURL, headers = {}, ...rest } = configure

    this.axiosClient.defaults.baseURL = baseURL
    this.axiosClient.defaults.headers = {
      ...merge(this.axiosClient.defaults.headers, headers)
    }
    this.axiosClient.defaults = {
      ...this.axiosClient.defaults,
      ...rest
    }
  }

  setHeaderToken(userToken?: string | null) {
    const jwt =
      /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/

    if (userToken && jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`
    } else {
      this.axiosClient.defaults.headers.common.Authorization = undefined
    }
  }

  get(resource: string, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`
    return this.axiosClient.get(requestURL, {
      data: null,
      ...merge({ headers: this.axiosClient.defaults.headers }, config)
    } as AxiosRequestConfig)
  }

  post(resource: string, data: object, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers) as AxiosRequestConfig
    )
  }

  update(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers) as AxiosRequestConfig
    )
  }

  put(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers) as AxiosRequestConfig
    )
  }

  patch(resource: string, data: object, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers) as AxiosRequestConfig
    )
  }

  delete(resource: string, data: object = {}, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers)
    } as AxiosRequestConfig)
  }
}

export default Axios.instance
