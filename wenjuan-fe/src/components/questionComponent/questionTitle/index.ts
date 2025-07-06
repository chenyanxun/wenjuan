import { QuestionTitleDefaultProps } from "./interface"
import Component from "./QuestionTitle"
import PropComponent from "./PropComponent"
export * from "./interface"

const QuestionTitleConfig = {
  title: "输入框", // 组件标题
  type: "questionTitle", // 组件类型标识
  Component, // 组件渲染
  PropComponent, // 组件属性配置
  defaultProps: QuestionTitleDefaultProps // 组件默认属性
}

export default QuestionTitleConfig
