import { IQuestionCheckbox, QuestionCheckboxDefaultProps } from './interface'
import { Typography, Checkbox, Space } from 'antd'
const { Paragraph } = Typography
export default function QuestionCheckbox(props: IQuestionCheckbox) {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, text, checked } = opt
          return (
            <Checkbox key={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </>
  )
}
