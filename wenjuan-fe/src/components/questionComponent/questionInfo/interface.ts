export interface IQuestionInfo {
  title?: string // 问题标题
  desc?: string // 问题描述
  onChange?: (newProps: IQuestionInfo) => void
  disabled?: boolean // 是否禁用
}

export const QuestionInfoDefaultProps: IQuestionInfo = {
  title: '问卷标题',
  desc: '问卷描述',
}
