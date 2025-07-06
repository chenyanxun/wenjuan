import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/questionComponent'
import { produce } from 'immer'
import { arrayMove } from '@dnd-kit/sortable'
import { getNextSelectedId, insertNewComponent } from './util'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'
export interface IComponentInfo {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string // 当前选中的组件ID
  componentList: IComponentInfo[] // 组件列表，包含所有组件信息
  copyComponent: IComponentInfo | null // 复制的组件信息
}
const INIT_STATE: ComponentsStateType = {
  selectedId: '', // 选中组件id
  componentList: [], // 组件列表
  copyComponent: null, // 复制的组件信息
}
export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 选中组件
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 添加组件
    addComponent: produce((draft: ComponentsStateType, action: PayloadAction<IComponentInfo>) => {
      const newComponent = action.payload
      insertNewComponent(draft, newComponent)
    }),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ id: string; newProps: ComponentPropsType }>
      ) => {
        const { id, newProps } = action.payload
        const component = draft.componentList.find(item => item.fe_id === id)
        if (component) {
          component.props = { ...component.props, ...newProps } // 合并新属性
        }
      }
    ),
    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(item => item.fe_id === selectedId)
      if (index >= 0) {
        // 重新计算选中组件 selectedId
        const nextSelectedId = getNextSelectedId(selectedId, componentList)
        draft.selectedId = nextSelectedId
        componentList.splice(index, 1) // 删除选中组件
      }
    }),
    // 显示、隐藏组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload
        const currentComponent = componentList.find(item => item.fe_id === fe_id)
        if (currentComponent) {
          // 重新计算选中组件
          let newSelectedId = ''
          if (isHidden) {
            // 隐藏组件
            newSelectedId = getNextSelectedId(draft.selectedId, componentList)
          } else {
            // 显示组件
            newSelectedId = fe_id
          }
          draft.selectedId = newSelectedId
          currentComponent.isHidden = isHidden
        }
      }
    ),
    // 锁定、解锁
    toggleLockedComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload
        const currentComponent = componentList.find(item => item.fe_id === fe_id)
        if (currentComponent) {
          currentComponent.isLocked = !currentComponent.isLocked
        }
      }
    ),
    // 复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const currentComponent = componentList.find(item => item.fe_id === selectedId)
      if (currentComponent) {
        draft.copyComponent = cloneDeep(currentComponent) // 深拷贝当前组件
      }
    }),
    // 粘贴组件
    pasteComponent: produce((draft: ComponentsStateType) => {
      const { copyComponent } = draft
      if (copyComponent == null) return // 如果没有复制的组件，直接返回
      const newComponent = cloneDeep(copyComponent) // 深拷贝复制的组件
      // 生成新的唯一ID
      newComponent.fe_id = nanoid()
      // 插入新组件
      insertNewComponent(draft, newComponent)
    }),
    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const currentIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if(currentIndex === undefined) return // 如果没有找到当前组件，直接返回
      if(currentIndex <= 0) return // 如果当前是第一个组件，直接返回
      const prevIndex = currentIndex - 1
      draft.selectedId = componentList[prevIndex].fe_id // 选中上一个组件
    }),
    // 选中下一个组件
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const currentIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if(currentIndex === undefined) return // 如果没有找到当前组件，直接返回
      if(currentIndex >= componentList.length - 1) return // 如果当前是最后一个组件，直接返回
      const nextIndex = currentIndex + 1
      draft.selectedId = componentList[nextIndex].fe_id // 选中下一个组件
    }),
    // 修改组件title
    changeComponentTitle: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id: string, title: string}>) => {
      const {componentList} = draft
      const {fe_id, title} = action.payload
      const currentComponent = componentList.find(item => item.fe_id === fe_id)
      if(currentComponent) {
        currentComponent.title = title
      }
    }),
    // 拖拽移动
    dragComponent: produce((draft: ComponentsStateType, action: PayloadAction<{oldIndex: number; newIndex: number}>) => {
      const {componentList} = draft
      const { oldIndex, newIndex } = action.payload
      draft.componentList = arrayMove(componentList, oldIndex, newIndex)
    })
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleLockedComponent,
  copySelectedComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  dragComponent
} = componentSlice.actions
export default componentSlice.reducer
