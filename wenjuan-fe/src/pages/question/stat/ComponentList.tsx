import { MouseEvent } from 'react'
import { getComponentConfByType } from '../../../components/questionComponent'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { IComponentInfo } from '../../../store/componentReducer'
import styles from './component.module.scss'
import classNames from 'classnames'
interface IProps {
  selectedComponentId: string,
  setSelectedComponentId: (id: string) => void
}
const getComponent = (componentInfo: IComponentInfo) => {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf === undefined) return null
  const { Component } = componentConf
  return <Component {...props} />
}

export default function ComponentList(props: IProps) {
  const {selectedComponentId, setSelectedComponentId} = props
  const { componentList } = useGetComponentInfo()
  const handleClick = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setSelectedComponentId(id)
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(item => !item.isHidden)
        .map(item => {
          const { fe_id } = item
          // 拼接className
          const defaultName = styles.canvas_content
          const selectName = styles.selected
          const resultClassName = classNames(defaultName, {
            [selectName]: selectedComponentId === fe_id,
          })
          return (
            <div key={fe_id} className={resultClassName} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{getComponent(item)}</div>
            </div>
          )
        })}
    </div>
  )
}
