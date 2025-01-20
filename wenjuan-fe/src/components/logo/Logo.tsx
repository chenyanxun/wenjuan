import { Space, Typography } from 'antd'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'
const { Title } = Typography
function Logo() {
  return (
    <Link to="/">
      <Space>
        <img width="40" src={logo} alt="" />
        <Title level={2} style={{ color: '#fff', marginBottom: 0 }}>
          小慕问卷
        </Title>
      </Space>
    </Link>
  )
}

export default Logo
