import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleLockedComponent,
  copySelectedComponent,
  pasteComponent
} from '../../../store/componentReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
export default function EditToolbar() {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copyComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const removeHandler = () => {
    dispatch(removeSelectedComponent())
  }
  const hiddenHandler = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  const toggleLockedHandler = () => {
    dispatch(toggleLockedComponent({ fe_id: selectedId }))
  }
  const copyHandler = () => {
    dispatch(copySelectedComponent())
  }
  const pasteHandler = () => {
    dispatch(pasteComponent())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={removeHandler}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={hiddenHandler}></Button>
      </Tooltip>
      <Tooltip title="解锁">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={toggleLockedHandler}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copyHandler}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<FileOutlined />}
          onClick={pasteHandler}
          disabled={copyComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  )
}
