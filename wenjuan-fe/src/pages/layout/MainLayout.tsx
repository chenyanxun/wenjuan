import { Outlet, useLocation } from 'react-router-dom'
import { Flex, Layout } from 'antd'
import styles from './layout.module.scss'
import Logo from '../../components/logo/Logo'
import UserInfo from '../../components/userInfo/UserInfo'
import { useEffect, useState } from 'react'
const { Header, Content, Footer } = Layout
function MainLayout() {
  const [show, setShow] = useState(true)
  const location = useLocation()
  useEffect(() => {
    const currentPath = location.pathname
    if (currentPath === '/login' || currentPath === '/register') {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [location.pathname])

  return (
    <Layout>
      <Header>
        <Flex justify="space-between" align="center">
          <Logo></Logo>
          {show && <UserInfo></UserInfo>}
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
