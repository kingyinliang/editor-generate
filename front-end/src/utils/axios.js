import axios from 'axios'
import $router from '@/router'
import { Notification } from 'element-ui'

class HttpManager {
  static _instance
  HTTP_RESPONSE_STATE = {
    SUCCESS: 200,
    EXPIRED_TOKEN: 401,
    ERROR: 500
  }
  constructor() {
    console.log('axios初始化');
    this._axios = axios.create({
      baseURL: 'http://localhost:3000/v1',
      timeout: 30000,
    })
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  static getInstance(){
    this._instance || (this._instance = new HttpManager())
    return this._instance
  }

  get(url, params ={}, config = {}) {
    return this._axios.get(url, {
      ...config,
      params
    })
  }

  post(url, data ={}, config = {}) {
    return this._axios.post(url, data, config)
  }

  interceptorsRequest(){
    this._axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      config.headers.common['Authorization'] = 'Bearer ' + token;
      return config;
    })
  }

  interceptorsResponse(){
    this._axios.interceptors.response.use(response => {
      if (response.data && response.data.code === this.HTTP_RESPONSE_STATE.SUCCESS) {
        return Promise.resolve(response)
      } else if (response.data && response.data.code === this.HTTP_RESPONSE_STATE.ERROR) {
        Notification({ title: '错误', message: response.data.msg, type: 'error', duration: 2000 });
        return Promise.reject(response);
      } else if (response.data && response.data.code === this.HTTP_RESPONSE_STATE.EXPIRED_TOKEN) {
        Notification({ title: '错误', message: response.data.msg, type: 'error', duration: 2000 });
        $router.push({path: '/login'});
        return Promise.reject(response);
      }
      Notification({ title: '错误', message: response.data.msg, type: 'error', duration: 2000 });
      return Promise.reject(response);
    })
  }
}

export default HttpManager.getInstance()
