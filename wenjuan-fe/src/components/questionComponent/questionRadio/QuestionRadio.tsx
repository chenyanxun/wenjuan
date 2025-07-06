import { IQuestionRadio, QuestionRadioDefaultProps } from './interface'
import { Typography, Radio } from 'antd'
const { Paragraph } = Typography
export default function QuestionRadio(props: IQuestionRadio) {
  const { title, value, options = [], isVertical } = { ...QuestionRadioDefaultProps, ...props }
  const radioOptions = options.map(opt => ({
    label: opt.text,
    value: opt.value,
  }))
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group
        value={value}
        options={radioOptions}
        style={
          isVertical ? { display: 'flex', flexDirection: 'column', gap: 8 } : { display: 'flex' }
        }
      ></Radio.Group>
    </>
  )
}
