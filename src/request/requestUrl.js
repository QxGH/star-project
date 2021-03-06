let url = {};

// 开发环境
if(process.env.NODE_ENV == 'development') {
  url = {
    baseUrl: 'http://kernel.services.test.xingchen.cn/',
    qiniuUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

// 测试环境
if(process.env.NODE_ENV == 'test') {
  url = {
    baseUrl: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    qiniuUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

// 生产环境
if(process.env.NODE_ENV == 'production') {
  url = {
    baseUrl: 'https://api.services.xingchen.cn',
    qiniuUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

export default url;