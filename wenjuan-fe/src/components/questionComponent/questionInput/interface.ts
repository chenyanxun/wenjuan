export interface IQuestionInput {
  title?: string,
  placeholder?: string
  onChange?: (newProps: IQuestionInput) => void
  disabled?: boolean
}
export const QuestionInputDefaultProps: IQuestionInput = {
  title: "输入框标题",
  placeholder: "请输入..."
}