import requestUrl from 'request/requestUrl';
import request from 'request/index';

const user = {
  login() {
    return request({
      url: `${requestUrl.baseUrl}/login`,
      method: 'post',
      source: 'base',
      tokenType: 'user'
    });
  },
  getShopList() {
    return request({
      url: `${requestUrl.baseUrl}/getShopList`,
      method: 'post',
      source: 'base'
    });
  },
  getStoreInfo() {
    return request({
      url: `${requestUrl.baseUrl}/getStoreInfo`,
      method: 'post',
      source: 'base'
    });
  },
  // getToken() {
  //   return request({
  //     url: `${requestUrl.baseUrl}/getToken`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // },
  // getRoles() {
  //   return request({
  //     url: `${requestUrl.baseUrl}/getRoles`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // },
  // getUserInfo(){
  //   return request({
  //     url: `${requestUrl.baseUrl}/getUserInfo`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // }
}

export default user;