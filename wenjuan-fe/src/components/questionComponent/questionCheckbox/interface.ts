export interface ICheckbox {
  value: string
  text: string
  checked: boolean
}
export interface IQuestionCheckbox {
  title?: string
  list?: ICheckbox[]
  isVertical?: boolean // 方向

  onChange?: (newProps: IQuestionCheckbox) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: IQuestionCheckbox = {
  title: '复选框标题',
  list: [
    { value: '11', text: '选项一', checked: false },
    { value: '22', text: '选项二', checked: false },
    { value: '33', text: '选项三', checked: false },
  ],
  isVertical: false,
}
