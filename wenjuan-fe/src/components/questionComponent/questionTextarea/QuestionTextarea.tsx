
import { IQuestionTextarea, QuestionTextareaDefaultProps } from "./interface"
import { Typography, Input } from "antd"
const {Paragraph} = Typography
export default function QuestionInput (props: IQuestionTextarea) {
  const {title, placeholder} = {...QuestionTextareaDefaultProps, ...props}
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </div>
  )
}