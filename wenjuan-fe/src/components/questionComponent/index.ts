import QuestionInputConf, { IQuestionInput } from './questionInput'
import QuestionTitleConf, { IQuestionTitle } from './questionTitle'
import QuestionParagraphConf, { IQuestionParagraph } from './questionParagraph'
import QuestionInfoConf, { IQuestionInfo } from './questionInfo'
import QuestionTextareaConf, { IQuestionTextarea } from './questionTextarea'
import QuestionRadioConf, { IQuestionRadio } from './questionRadio'
import QuestionCheckboxConf, { IQuestionCheckbox } from './questionCheckbox'
// 各组件 prop type
export type ComponentPropsType = IQuestionInput &
  IQuestionTitle &
  IQuestionParagraph &
  IQuestionInfo &
  IQuestionTextarea &
  IQuestionRadio &
  IQuestionCheckbox

// 各组件配置
export type ComponentConfType = {
  title: string
  type: string
  Component: React.ComponentType<ComponentPropsType>
  PropComponent: React.ComponentType<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(item => item.type === type)
}
