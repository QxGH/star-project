import axios from '@/request/';

const shopManage = {
  getShopList(formData) {
    // 属性组列表
    return axios({
      url: `mall/shop/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default shopManage;