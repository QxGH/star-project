import axios from '@/request/';

const goodsManage = {
  attributeLists(formData) {
    // 属性组列表
    return axios({
      url: `products/attribute/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  attributeCreate(formData) {
    // 创建属性组
    return axios({
      url: `products/attribute/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  abilityCreate(formData) {
    // 创建属性值信息
    return axios({
      url: `products/ability/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  submitGoods(formData) {
    // 商品创建/编辑
    return axios({
      url: `products/product/maintain`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getGoodsList(formData) {
    // 商品库 列表
    return axios({
      url: `products/product/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delGoods(formData) {
    // 商品删除
    return axios({
      url: `products/product/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getGoodsDetails(formData) {
    // 商品库 列表
    return axios({
      url: `products/product/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  uploadCard(formData) {
    // 新建、编辑商品 上传核销码
    return axios({
      url: `products/product/importCardNumber`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false,
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
}

export default goodsManage;