import { Button, Input, Space, Typography, Tooltip, QRCode, Popover } from 'antd'
import { LeftOutlined, FileOutlined, QrcodeOutlined } from '@ant-design/icons'
import styles from './statHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography
export default function StatHeader() {
  const { title } = useGetPageInfo()
  const nav = useNavigate()
  const inputValue = 'http://localhost:8000/question/123456'

  return (
    <div className={styles.header}>
      <div>
        <Space align="center">
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title level={3} style={{ marginBottom: 0 }}>
            {title}
          </Title>
        </Space>
      </div>
      <div>
        <Space align="center">
          <Input style={{ width: '300px' }} value={inputValue} disabled></Input>
          <Tooltip title="复制链接">
            <Button icon={<FileOutlined />}></Button>
          </Tooltip>
          <Popover
            placement="bottom"
            content={<QRCode value={inputValue} bordered={false} size={120} />}
          >
            <Button icon={<QrcodeOutlined />}></Button>
          </Popover>
        </Space>
      </div>
      <div>
        <Button type="primary">编辑问卷</Button>
      </div>
    </div>
  )
}
