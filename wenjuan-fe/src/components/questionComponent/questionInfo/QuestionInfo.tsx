import { IQuestionInfo, QuestionInfoDefaultProps } from './interface'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography
export default function QuestionInfo(props: IQuestionInfo) {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props }
  const t = desc?.split('\n')
  return (
    <>
      <Title style={{ textAlign: 'center' }}>{title}</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: 0 }}>
        {t?.map((line, index) => (
          <span key={index}>
            {line}
            {index < t.length - 1 && <br />} {/* 添加换行符，除最后一行外 */}
          </span>
        ))}
      </Paragraph>
    </>
  )
}
