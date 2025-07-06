import { useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
export default function PageSetting() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { title, desc, js, css } = useGetPageInfo()
  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [form, title, desc, js, css])
  const changeForm = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      onValuesChange={changeForm}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item label="js" name="js">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item label="css" name="css">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
    </Form>
  )
}
