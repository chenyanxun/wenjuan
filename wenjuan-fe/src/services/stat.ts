import { IRes } from '../type'
import http from './http'

// 获取问卷的统计列表
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<IRes> {
  const url = `/api/stat/${questionId}`
  const data = (await http.get(url, { params: opt })) as IRes
  return data
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<IRes> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await http.get(url)) as IRes
  return data
}
