let url = {};

// 开发环境
if(process.env.NODE_ENV == 'development') {
  url = {
    baseUrl: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
};

// 测试环境
if(process.env.NODE_ENV == 'test') {
  url = {
    baseUrl: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
};

// 生产环境
if(process.env.NODE_ENV == 'production') {
  url = {
    baseUrl: 'https://api.services.xingchen.cn',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
};

export default url;