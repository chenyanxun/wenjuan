import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'
import Component from './QuestionInfo'

export * from './interface'

const QuestionInfoConfig = {
  title: '问卷标题',
  type: 'questionInfo',
  Component, // 组件渲染
  PropComponent, // 组件属性配置
  defaultProps: QuestionInfoDefaultProps, // 组件默认属性
}
export default QuestionInfoConfig
