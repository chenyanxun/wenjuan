import { Form, Typography, Button, Space, Input, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { login, userinfo } from '../../services/user'
import { USERTOKEN } from '../../constant'
import { IUserState, loginReducer } from '../../store/userReducer'
import { useDispatch } from 'react-redux'
const { Title } = Typography
interface IFormValue {
  username: string
  password: string
  remember: boolean
}
function Index() {
  const [form] = Form.useForm()
  const nav = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const username = localStorage.getItem('username')
    form.setFieldsValue({ username: username })
  })
  const onFinish = async (values: IFormValue) => {
    const { username, password, remember } = values
    const data = await login(username, password)
    if (data.errno === 0) {
      if (remember) {
        localStorage.setItem('username', username)
      } else {
        localStorage.removeItem('username')
      }
      sessionStorage.setItem(USERTOKEN, data.data.token)
      const result = await userinfo()
      if (result.errno === 0) {
        dispatch(loginReducer(result.data as IUserState))
      }
      nav('/manage/list')
    }
  }
  return (
    <div className={styles.index}>
      <Title level={2}>
        <Space>
          <UserAddOutlined />
          用户登录
        </Space>
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to="/register">注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Index
