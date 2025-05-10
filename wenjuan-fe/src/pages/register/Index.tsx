import { Form, Typography, Button, Space, Input, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { register } from '../../services/user'
const { Title } = Typography
interface IFormValue {
  username: string
  password: string
  againPwd: string
  nickname: string
}
function Index() {
  const [form] = Form.useForm()
  const nav = useNavigate()
  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      const data = await register(username, password, nickname)
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        if (data.errno === 0) {
          message.success('注册成功')
          nav('/login')
        }
      },
    }
  )

  const onFinish = (values: IFormValue) => {
    run(values)
  }
  return (
    <div className={styles.index}>
      <Title level={2}>
        <Space>
          <UserAddOutlined />
          注册新用户
        </Space>
      </Title>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
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
        <Form.Item
          label="确认密码"
          name="againPwd"
          rules={[{ required: true, message: '请确认密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Space>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Link to="/login">已有账户，登录</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Index
