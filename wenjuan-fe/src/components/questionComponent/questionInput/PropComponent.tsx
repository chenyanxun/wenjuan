import { useEffect } from 'react'
import { IQuestionInput } from './interface'
import { Form, Input } from 'antd'
export default function PropComponent(props: IQuestionInput) {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    // 设置表单初始值
    form.setFieldsValue({ title, placeholder })
  }, [form, title, placeholder])
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
      initialValues={{ title, placeholder }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}
