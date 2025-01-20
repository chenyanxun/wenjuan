import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './layout.module.scss'
import { Button, Divider, Space } from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'

function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className={styles.manage_layout}>
      <div className={styles.manage_left}>
        <Button type="primary" icon={<PlusOutlined />}>
          新建问卷
        </Button>
        <Divider></Divider>
        <Space direction="vertical">
          <Button
            type={pathname === '/manage/list' ? 'default' : 'text'}
            icon={<UnorderedListOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname === '/manage/star' ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname === '/manage/trash' ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.manage_right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
