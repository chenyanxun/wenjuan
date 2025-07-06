import styles from './canvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/questionComponent'
import { IComponentInfo } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentReducer'
import classNames from 'classnames'
import { MouseEvent } from 'react'
import useKeyPressEvent from '../../../hooks/useKeyPressEvent'
import SortableContainer from '../../../components/dragComponent/SortableContainer'
import SortableItem from '../../../components/dragComponent/SortableItem'
import { dragComponent } from '../../../store/componentReducer'
const getComponent = (componentInfo: IComponentInfo) => {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf === undefined) return null
  const { Component } = componentConf
  return <Component {...props} />
}
export default function EditCanvas() {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentInfo()
  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(dragComponent({ oldIndex, newIndex }))
  }
  // 相当于vue的 mixin
  useKeyPressEvent()
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(item => !item.isHidden)
          .map(item => {
            const { fe_id, isLocked } = item
            // 拼接className
            const defaultName = styles.canvas_content
            const selectName = styles.selected
            const lockedName = styles.locked
            const resultClassName = classNames(defaultName, {
              [selectName]: selectedId === fe_id,
              [lockedName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={resultClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}
