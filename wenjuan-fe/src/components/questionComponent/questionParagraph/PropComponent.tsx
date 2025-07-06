import { useEffect } from 'react'
import { IQuestionParagraph } from './interface'
import { Form, Input, Checkbox } from 'antd'
export default function PropComponent(props: IQuestionParagraph) {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    // 设置表单初始值
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter, form])
  const changeForm = () => {
    if (onChange) {
      // 调用 onChange 回调函数
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}
