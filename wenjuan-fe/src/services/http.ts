import axios from 'axios'
// 创建axios实例
const http = axios.create({
  baseURL: '/', // 设置基础 URL
  timeout: 10000, // 设置超时时间
  headers: { 'Content-Type': 'application/json' }, // 默认请求头
})
// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // console.log('请求拦截器:', config)
    // 例如，添加认证令牌
    // const token = localStorage.getItem('authToken')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    // 返回配置对象
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求拦截器错误:', error)
    // return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // console.log('响应拦截器:', response)

    // 例如，直接返回响应数据
    return response.data // 或 response.data.data（根据后端返回的结构）
  },
  error => {
    // 对响应错误做点什么
    console.error('响应拦截器错误:', error)

    // 如果需要，可以在这里统一处理错误
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('服务器响应错误:', error.response.status)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('请求未收到响应:', error.request)
    } else {
      // 在设置请求时触发了错误
      console.error('请求配置错误:', error.message)
    }

    // 返回错误对象或抛出错误
    return Promise.reject(error)
  }
)
// 导出
export default http
