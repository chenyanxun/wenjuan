import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import useGetQuestionData from '../../../hooks/useGetQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
function Index() {
  const dispatch = useDispatch()
  const data = useGetQuestionData()
  // console.log(data)
  const clearSelectedId = () => {
    dispatch(changeSelectedId('')) // 清除选中组件
  }
  return (
    <div className={styles.edit}>
      <div className={styles.top}>
        <EditHeader />
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <LeftPanel />
        </div>
        <div className={styles.center} onClick={clearSelectedId}>
          <EditCanvas />
        </div>
        <div className={styles.right}>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Index
