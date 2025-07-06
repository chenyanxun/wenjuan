import { QuestionInputDefaultProps } from "./interface"
import Component from "./QuestionInput"
import PropComponent from "./PropComponent"
export * from "./interface"

// 组件配置
const QuestionInputConfig = {
  title: "输入框", // 组件标题
  type: "questionInput", // 组件类型标识
  Component, // 组件渲染
  PropComponent, // 组件属性配置
  defaultProps: QuestionInputDefaultProps // 组件默认属性
}

export default QuestionInputConfig
