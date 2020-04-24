const path = require('path');

let config = {
	publicPath: "./",
	outputDir: "dist",
	assetsDir: "static",
	lintOnSave: false,
	runtimeCompiler: false,
	productionSourceMap: false,
	devServer: {
		host: "0.0.0.0",
		port: 8083,
		https: false,
		disableHostCheck: true
	},
	configureWebpack: {
		resolve: {
			alias: {
				'views': '@/views',
				'components': '@/components',
				'tools': '@/tools',
				'api': '@/api',
				'images': '@/assets/images',
				'style': '@/assets/style',
				'request': '@/request',
				'store': '@/store'
			},
		},
		externals: {
			vue: "Vue",
			vuex: "Vuex",
			'vue-router': 'VueRouter',
			'axios': 'axios',
			'qs': 'Qs',
			'element-ui': 'ELEMENT'
		},
		devtool: 'source-map'
	}
};

if (process.env.NODE_ENV == 'development') {
	// 开发环境时 跨域代理
	config.devServer.proxy = {
		'/api': {
			target: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
			changeOrigin: true,
			ws: true,
			pathRewrite: {
				'^/api': ''
			}
		}
	}
};

module.exports = config;