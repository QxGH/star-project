// 请求
import axios from 'axios'
import requestUrl from './requestUrl'
import store from 'store'
import { Alert, Message } from 'element-ui'

import {
  getUserToken,
  getStoreToken,
  clearCookie
} from 'tools/Cookie'

const service = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(config => {

  if(config.tokenType == 'user') {
    config.headers.token = getUserToken();
  } else {
    config.headers.token = getStoreToken();
  };

  //判断baseURL
  if (config.source === 'base') {
    config.baseURL = requestUrl.baseUrl
  } else if(config.source === 'qiniu') {
    config.baseURL = requestUrl.qiniuUrl
  } else {
    config.baseURL = requestUrl.baseUrl
  };
  return config;
}, error => {
  return Promise.reject(error)
})

// request interceptor
service.interceptors.response.use(response => {
  if(response.status === 200) {
    if (response.data.code >= 10000) {
      Alert('用户授权失败', {
        confirmButtonText: '确定',
        callback: action => {
          clearCookie();
          window.location.href = store.state.domainURL + '/#/login';
        }
      });
    } else if (response.data.code !== 0) {
      Message.error(response.data.message);
      return { fail: true };
    } else {
      return Promise.resolve(response)
    }
  } else {
    debugger
    return Promise.reject(response)
  }
}, error => {
  Message.error('网络繁忙，请刷新重试！');
  return Promise.reject(error)
})

export default service
