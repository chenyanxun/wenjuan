import { QuestionParagraphDefaultProps } from "./interface"
import Component from "./QuestionParagraph"
import PropComponent from "./PropComponent"
export * from "./interface"

const QuestionParagraphConfig = {
  title: "段落", // 组件标题
  type: "questionParagraph", // 组件类型标识
  Component, // 组件渲染
  PropComponent, // 组件属性配置
  defaultProps: QuestionParagraphDefaultProps // 组件默认属性
}

export default QuestionParagraphConfig