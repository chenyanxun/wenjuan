import { IComponentInfo, ComponentsStateType } from '.'

export const getNextSelectedId = (selected: string, componentList: IComponentInfo[]) => {
  const visibleComponents = componentList.filter(item => !item.isHidden)
  const index = visibleComponents.findIndex(item => item.fe_id === selected)
  if (index === -1) return ''
  let nextSelectedId = ''
  const length = visibleComponents.length
  if (length <= 1) {
    return nextSelectedId
  } else {
    if (index + 1 === length) {
      nextSelectedId = visibleComponents[index - 1].fe_id
    } else {
      nextSelectedId = visibleComponents[index + 1].fe_id
    }
  }
  return nextSelectedId
}
export const insertNewComponent = (draft: ComponentsStateType, newComponent: IComponentInfo) => {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(item => item.fe_id === selectedId)
  if (index < 0) {
    // 如果没有选中组件，则直接添加到列表末尾
    componentList.push(newComponent)
  } else {
    // 如果有选中组件，则在其后添加新组件
    componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id // 更新选中组件ID为新添加的组件
}
