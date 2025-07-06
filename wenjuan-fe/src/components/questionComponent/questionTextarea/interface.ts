export interface IQuestionTextarea {
  title?: string,
  placeholder?: string
  onChange?: (newProps: IQuestionTextarea) => void
  disabled?: boolean
}
export const QuestionTextareaDefaultProps: IQuestionTextarea = {
  title: "文本框标题",
  placeholder: "请输入..."
}