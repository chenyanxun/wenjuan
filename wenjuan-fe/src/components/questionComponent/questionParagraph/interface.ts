export interface IQuestionParagraph {
  text?: string,
  isCenter?: boolean,
  onChange?: (newProps: IQuestionParagraph) => void,
  disabled?: boolean
}
export const QuestionParagraphDefaultProps: IQuestionParagraph = {
  text: "这是一个段落",
  isCenter: false
}