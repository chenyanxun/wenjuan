import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './layer.module.scss'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Input, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import {
  IComponentInfo,
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleLockedComponent,
} from '../../../store/componentReducer'
import { useState } from 'react'
import SortableContainer from '../../../components/dragComponent/SortableContainer'
import SortableItem from '../../../components/dragComponent/SortableItem'
import { dragComponent } from '../../../store/componentReducer'
export default function Layer() {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  const [changeTitleID, setChangeTitleID] = useState('')
  const chooseComponent = (id: string) => {
    const currentComponent = componentList.find(item => item.fe_id === id)
    if (currentComponent && currentComponent.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (id !== selectedId) {
      dispatch(changeSelectedId(id))
      return
    }
    setChangeTitleID(id)
  }
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }
  const hiddenHandle = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden: !isHidden }))
  }
  const lockedHandle = (fe_id: string) => {
    dispatch(toggleLockedComponent({ fe_id }))
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(dragComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((item, index) => {
        const { fe_id, title, isHidden, isLocked } = item as IComponentInfo

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={classNames(styles.item, { [styles.active]: selectedId === fe_id })}>
              <div className="content" onClick={() => chooseComponent(item.fe_id)}>
                {fe_id === changeTitleID && (
                  <Input
                    value={title}
                    onPressEnter={() => setChangeTitleID('')}
                    onBlur={() => setChangeTitleID('')}
                    onChange={e => changeTitle(e)}
                  />
                )}
                {fe_id !== changeTitleID && title}
              </div>
              <div className="btn-group">
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'default'}
                    onClick={() => hiddenHandle(fe_id, isHidden as boolean)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'default'}
                    onClick={() => lockedHandle(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}
