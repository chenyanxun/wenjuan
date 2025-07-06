import { useSelector } from 'react-redux'
import { IState } from '../store'
import { ComponentsStateType } from '../store/componentReducer'

function useGetComponentInfo() {
  const components = useSelector<IState>(state => state.components) as ComponentsStateType
  // es6+新特性，默认值
  const { componentList = [], selectedId, copyComponent } = components
  const selectedComponent = componentList.find(item => item.fe_id === selectedId)
  return {
    componentList, // 组件列表
    selectedId, // 被选中组件id
    selectedComponent,// 被选中组件
    copyComponent // 复制组件
  }
}

export default useGetComponentInfo
