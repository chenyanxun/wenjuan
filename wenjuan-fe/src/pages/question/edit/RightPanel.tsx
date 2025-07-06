import { AlignLeftOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import { useEffect, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
enum TAB_KEYS {
  PROP_KEY = 'props',
  SETTING_KEY = 'setting',
}
const items = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: (
      <span>
        <AlignLeftOutlined /> 属性
      </span>
    ),
    children: <ComponentProp />,
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: (
      <span>
        <UnorderedListOutlined /> 页面设置
      </span>
    ),
    children: <PageSetting />,
  },
]
export default function RightPanel() {
  const { selectedId } = useGetComponentInfo()
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])

  const changeActive = (activeKey: string) => {
    setActiveKey(activeKey as TAB_KEYS)
  }

  return <Tabs activeKey={activeKey} items={items} onChange={changeActive} />
}
