import { QuestionRadioDefaultProps } from './interface'
import Component from './QuestionRadio'
import PropComponent from './PropComponent'
export * from './interface'

const QuestionRadioConfig = {
  title: '单选框',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}

export default QuestionRadioConfig
