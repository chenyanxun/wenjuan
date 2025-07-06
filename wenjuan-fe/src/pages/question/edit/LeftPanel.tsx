import { AlignLeftOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'
import Layer from './Layer'
const items = [
  {
    key: 'componentLib',
    label: (
      <span>
        <AlignLeftOutlined /> 组件库
      </span>
    ),
    children: <ComponentLib />,
  },
  {
    key: 'layer',
    label: (
      <span>
        <UnorderedListOutlined /> 图层
      </span>
    ),
    children: <Layer />,
  },
]
export default function LeftPanel() {
  return <Tabs defaultActiveKey="componentLib" items={items} />
}
