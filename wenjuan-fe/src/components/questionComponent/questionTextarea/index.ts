import { QuestionTextareaDefaultProps } from './interface'
import Component from './QuestionTextarea'
import PropComponent from './PropComponent'
export * from './interface'

// 组件配置
const QuestionTextareaConfig = {
  title: '文本框', // 组件标题
  type: 'questionTextarea', // 组件类型标识
  Component, // 组件渲染
  PropComponent, // 组件属性配置
  defaultProps: QuestionTextareaDefaultProps, // 组件默认属性
}

export default QuestionTextareaConfig
