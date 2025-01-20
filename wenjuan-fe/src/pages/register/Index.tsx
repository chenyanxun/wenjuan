import { Form, Typography, Button, Space, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
const { Title } = Typography
function Index() {
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
