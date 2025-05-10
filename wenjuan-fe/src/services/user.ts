import { IRes } from '../type'
import http from './http'

// 测试
export const testHttp = async (): Promise<IRes> => {
  const data = (await http.get('/api/test')) as IRes
  return data
}

// 注册
export const register = async (
  username: string,
  password: string,
  nickname: string | null
): Promise<IRes> => {
  const data = (await http.post('/api/user/register', {
    username,
    password,
    nickname: nickname || username,
  })) as IRes
  return data
}

// 登录
export const login = async (username: string, password: string): Promise<IRes> => {
  const data = (await http.post('/api/user/login', {
    username: username,
    password: password,
  })) as IRes
  return data
}

// 获取用户信息
export const userinfo = async (): Promise<IRes> => {
  const data = (await http.get('/api/user/info')) as IRes
  return data
}
