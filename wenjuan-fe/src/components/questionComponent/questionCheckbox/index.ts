import { QuestionCheckboxDefaultProps } from './interface'
import Component from './QuestionCheckbox'
import PropComponent from './PropComponent'
export * from './interface'

const QuestionCheckboxConfig = {
  title: '复选框',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
export default QuestionCheckboxConfig
