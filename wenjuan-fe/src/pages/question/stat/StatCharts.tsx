import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useRef, useState } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { divide } from 'lodash'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])
interface IProps {
  selectedComponentId: string
}
export default function StatCharts(props: IProps) {
  const { selectedComponentId } = props
  const { id } = useParams()
  const [stat, setStat] = useState([])
  useEffect(() => {
    fetchData()
    async function fetchData() {
      if (id && selectedComponentId) {
        const res = await getComponentStatService(id, selectedComponentId)
        if (res.errno === 0) {
          const { stat } = res.data
          setStat(stat)
        }
      } else {
      }
    }
  }, [id, selectedComponentId])
  const chartRef = useRef(null)
  useEffect(() => {
    if (chartRef.current) {
      // 初始化chart
      const chart = echarts.init(chartRef.current)
      // 配置数据
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%', // 饼图半径（可设为数组实现环形图，如 ['50%', '70%']）
            data: stat.map(item => {
              const { name, count } = item
              return {
                name: name,
                value: count,
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      // 渲染图表
      chart.setOption(option)
      // 响应式调整
      const handleResize = () => chart.resize()
      window.addEventListener('resize', handleResize)
      // 清理副作用
      return () => {
        window.removeEventListener('resize', handleResize)
        chart.dispose()
      }
    }
  }, [stat])
  return (
    <div style={{ width: '100%', height: '300px' }}>
      {selectedComponentId && stat.length > 0 ? (
        <div ref={chartRef} style={{ height: '100%' }}></div>
      ) : (
        <div>未选中组件</div>
      )}
    </div>
  )
}
