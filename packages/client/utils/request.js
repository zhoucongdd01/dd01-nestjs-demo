import axios from 'axios';
import { useCookie } from 'next-cookie';


const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3302'
    : 'https://api.blog.wipi.tech',
  timeout: 20000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    const cookies = useCookie();
    const account_token = cookies.get('account_token');
    if (account_token) {
      config.headers.Authorization = `Bearer ${account_token}`
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const _Request = (url, method, data, params, headers) => {
    return new Promise((resolve, reject) => {
        instance({
            url,
            method,
            data,
            params,
            headers
        }).then(res => {
            if (!res.data.success || res.data.msg){
              reject(res.data.msg)
            } else {
              resolve(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
