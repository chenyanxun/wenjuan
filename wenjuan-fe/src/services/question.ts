import { IRes } from '../type'
import http from './http'
// 获取问卷列表
export const getQuestionList = async (
  pageIndex: string,
  pageSize: string,
  keyword: string,
  isStar?: boolean,
  isDeleted?: boolean
): Promise<IRes> => {
  const data = (await http.get('/api/question', {
    params: {
      pageIndex,
      pageSize,
      keyword,
      isStar,
      isDeleted,
    },
  })) as IRes
  return data
}

// 创建问卷
export async function createQuestionService(): Promise<IRes> {
  const url = '/api/question'
  const data = (await http.post(url)) as IRes
  return data
}