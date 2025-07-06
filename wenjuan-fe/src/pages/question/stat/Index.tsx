import styles from './index.module.scss'
import StatHeader from './StatHeader'
import StatTable from './StatTable'
import StatCharts from './StatCharts'
import ComponentList from './ComponentList'
import useGetQuestionData from '../../../hooks/useGetQuestionData'
import { useState } from 'react'
function Index() {
  useGetQuestionData()
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  return (
    <div className={styles.stat}>
      <div className={styles.top}>
        <StatHeader />
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className={styles.center}>
          <StatTable
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className={styles.right}>
          <StatCharts
            selectedComponentId={selectedComponentId}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
