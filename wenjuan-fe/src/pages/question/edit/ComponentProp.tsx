import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/questionComponent'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentReducer'
const NoProps = () => {
  return <div>No Props</div>
}
export default function ComponentProp() {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent === undefined) {
    return <NoProps />
  }
  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf === undefined) {
    return <NoProps />
  }
  const { PropComponent } = componentConf
  const changeProps = (newProps: ComponentPropsType) => {
    const { fe_id } = selectedComponent
    // 这里可以调用 Redux 的 action 来更新组件属性
    dispatch(changeComponentProps({ id: fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}
