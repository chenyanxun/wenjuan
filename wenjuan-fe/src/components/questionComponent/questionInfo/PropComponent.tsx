import { IQuestionInfo } from './interface'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
export default function PropComponent(props: IQuestionInfo) {
  const [form] = Form.useForm()
  const { title, desc, onChange, disabled } = props
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc, form])
  const changeForm = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  )
}
