
import { IQuestionInput, QuestionInputDefaultProps } from "./interface"
import { Typography, Input } from "antd"
const {Paragraph} = Typography
export default function QuestionInput (props: IQuestionInput) {
  const {title, placeholder} = {...QuestionInputDefaultProps, ...props}
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}