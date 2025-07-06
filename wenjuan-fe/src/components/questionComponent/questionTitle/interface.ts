export interface IQuestionTitle {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  onChange?: (newProps: IQuestionTitle) => void
  disabled?: boolean
}
export const QuestionTitleDefaultProps: IQuestionTitle = {
  text: '一行标题...',
  level: 1,
  isCenter: false,
}
