import { componentConfGroup, ComponentConfType } from '../../../components/questionComponent'
import { Typography } from 'antd'
import styles from './componentLib.module.scss'
import { nanoid } from 'nanoid'
import { addComponent } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
const { Title } = Typography

const genComponent = (c: ComponentConfType, dispatch: ReturnType<typeof useDispatch>) => {
  const { Component, defaultProps, title, type } = c

  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps,
      })
    )
  }
  return (
    <div className={styles.wrap} key={type} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}
export default function ComponentLib() {
  const dispatch = useDispatch()
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupName, components } = group
        return (
          <div key={index} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
            <Title level={5}>{groupName}</Title>
            <div>{components.map(c => genComponent(c, dispatch))}</div>
          </div>
        )
      })}
    </>
  )
}
