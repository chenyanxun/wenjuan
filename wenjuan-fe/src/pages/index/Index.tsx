import { Button, Typography } from 'antd'
import styles from './index.module.scss'
const { Title, Paragraph } = Typography
function Index() {
  return (
    <div className={styles.index}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
      <Button type="primary" size="large">
        开始使用
      </Button>
    </div>
  )
}

export default Index
