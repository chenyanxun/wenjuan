import { useNavigate } from 'react-router-dom'
import { USERTOKEN } from '../../constant'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { IUserState, logoutReducer } from '../../store/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { IState, persistor } from '../../store'
function UserInfo() {
  const isLogin = sessionStorage.getItem(USERTOKEN)
  const dispatch = useDispatch()
  const { nickname } = useSelector<IState>(state => state.user) as IUserState

  const nav = useNavigate()
  const [name, setName] = useState('登录')
  const loginEvent = () => {
    nav('/login')
  }
  const logoutEvent = () => {
    sessionStorage.clear()
    dispatch(logoutReducer())
    persistor.purge()
    nav('/')
  }

  useEffect(() => {
    if (isLogin && nickname) {
      const name = nickname || '已登录'
      setName(name)
    } else {
      setName('登录')
    }
  }, [isLogin, nickname])
  const notLogin = () => {
    return (
      <div className={styles.noLogin} onClick={loginEvent}>
        {name}
      </div>
    )
  }
  const hasLogin = () => {
    return (
      <div className={styles.haslogin}>
        <div className={styles.name}>{name}</div>
        <div className={styles.logout} onClick={logoutEvent}>
          退出
        </div>
      </div>
    )
  }
  return <>{isLogin ? hasLogin() : notLogin()}</>
}

export default UserInfo
