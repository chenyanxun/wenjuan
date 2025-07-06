import { useEffect } from 'react'
import { IQuestionTitle } from './interface'
import { Form, Input, Select, Checkbox } from 'antd'
export default function PropComponent(props: IQuestionTitle) {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  // 设置表单初始值
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [form, text, level, isCenter])
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
      initialValues={{ text, level, isCenter }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="标题级别"
        name="level"
        rules={[{ required: true, message: '请选择标题级别' }]}
      >
        <Select
          options={[
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}
