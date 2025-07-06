import { useEffect, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Table, Pagination } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
interface IProps {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
}
export default function StatTable(props: IProps) {
  const { selectedComponentId, setSelectedComponentId } = props
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
    async function fetchData() {
      const data = await getQuestionStatListService(id as string, {
        page,
        pageSize,
      })
      if (data.errno === 0) {
        const { total, list } = data.data
        setTotal(total)
        setData(list)
      }
    }
  }, [id, page, pageSize])
  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(item => {
    const { fe_id, title, props, type } = item
    const colTitle = props.title || title
    return {
      title: (
        <div
          onClick={() => setSelectedComponentId(fe_id)}
          style={{ color: selectedComponentId === fe_id ? 'red' : '' }}
        >
          <span>{colTitle}</span>{' '}
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  const dataSource = data.map((item: any) => {
    return { ...item, key: item._id }
  })
  return (
    <>
      <div>答卷数量：{total}</div>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <Pagination
        total={total}
        onChange={page => setPage(page)}
        current={page}
        pageSize={pageSize}
        onShowSizeChange={(page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
        }}
      ></Pagination>
    </>
  )
}
