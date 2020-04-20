import axios from '@/request/';

const goods_category = {
  categoryList(formData) {
    // 属性组列表
    return axios({
      url: `products/category/lists`,
      method: 'get',
      source: 'base',
      secret: false,
      params: formData
    });
  },
  categorySubList(formData) {
    // 属性组列表
    return axios({
      url: `products/subclass/lists`,
      method: 'get',
      source: 'base',
      params: formData
    });
  }
}

export default goods_category;