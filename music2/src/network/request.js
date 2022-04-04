import config from './config.js'
import axios from 'axios'

//音乐数据
const musicInstance = new axios.create({
	baseURL: config.musicUrl, //默认路径
	timeout: 5000
});

// 请求拦截器
musicInstance.interceptors.request.use(config => {
	//拦截后需要将拦截下来的请求数据返回发送
	return config;
}, err => {
	console.log(err);
	//return Promise.reject(err)
})

// 响应拦截器
musicInstance.interceptors.response.use(res => {
	// 拦截后需要将拦截下来处理成的结果返回
	return res.data
}, err => {
	console.log(err)
})


//登录	注册	发送评论
const myInstance = new axios.create({
	baseURL: config.myUrl, //默认路径
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	},
	timeout: 5000
});

// 请求拦截器
myInstance.interceptors.request.use(config => {
	//拦截后需要将拦截下来的请求数据返回发送
	return config;
}, err => {
	//console.log(err);
	return Promise.reject(err)
})

// 响应拦截器
myInstance.interceptors.response.use(res => {
	// 拦截后需要将拦截下来处理成的结果返回
	return res.data
}, err => {
	return err.response.data
	//return Promise.reject(err)
})

export default {
	musicInstance,
	myInstance
}
