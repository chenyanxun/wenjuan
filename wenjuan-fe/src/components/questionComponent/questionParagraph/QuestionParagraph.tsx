import { Typography } from 'antd'
import { IQuestionParagraph, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

export default function QuestionParagraph(props: IQuestionParagraph) {
  const { text, isCenter } = { ...QuestionParagraphDefaultProps, ...props }
  const t = text?.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'left', marginBottom: 0 }}>
      {/* <pre>
        {text}
      </pre> */}
      {t?.map((line, index) => (
        <span key={index}>
          {line}
          {index >= 0 && <br />}
        </span>
      ))}
    </Paragraph>
  )
}
