export interface IOption {
  value: string
  text: string
}
export interface IQuestionRadio {
  title?: string // 标题
  value?: string // 选中项
  options?: IOption[] // 选项
  isVertical?: boolean // 方向

  onChange?: (newProps: IQuestionRadio) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: IQuestionRadio = {
  title: '单选输入框',
  value: '',
  options: [
    { value: '111', text: '111' },
    { value: '222', text: '222' },
    { value: '333', text: '333' },
  ],
  isVertical: false,
}
