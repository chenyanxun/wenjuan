import { Outlet } from 'react-router-dom'
import { Flex, Layout } from 'antd'
import styles from './layout.module.scss'
import Logo from '../../components/logo/Logo'
import UserInfo from '../../components/userinfo/UserInfo'
const { Header, Content, Footer } = Layout
function MainLayout() {
  return (
    <Layout>
      <Header>
        <Flex justify="space-between" align="center">
          <Logo></Logo>
          <UserInfo></UserInfo>
        </Flex>
      </Header>
      <Layout className={styles.main_layout}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.main_footer}>
        小慕问卷 https://coding.imooc.com/class/646.html
      </Footer>
    </Layout>
  )
}

export default MainLayout
