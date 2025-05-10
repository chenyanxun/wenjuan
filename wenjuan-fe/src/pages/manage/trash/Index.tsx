import { Typography, Table, Space, Button, Tag, Pagination, message } from 'antd'
import styles from '../index.module.scss'
import Search from '../../../components/search/Search'
import { Key, useEffect, useState } from 'react'
import { IAnyJson } from '../../../type'
import {
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGEINDEX_NUMBER,
  DEFAULT_PAGESIZE,
  DEFAULT_PAGESIZE_NUMBER,
  DEFAULT_KEYWORD,
  DEFAULT_KEYWORD_VALUE,
} from '../../../constant'
import { getQuestionList } from '../../../services/question'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
const { Title } = Typography
function Index() {
  const [searchParams] = useSearchParams()
  const [dataSource, setDataSource] = useState<IAnyJson[]>([])
  const [total, setTotal] = useState()
  const [currentPageIndex, setCurrentPageIndex] = useState(DEFAULT_PAGEINDEX_NUMBER)
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGESIZE_NUMBER)
  const [currentKeyword, setCurrentKeyword] = useState(DEFAULT_KEYWORD_VALUE)
  const [ids, setIds] = useState<Key[]>([])
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const pageIndex = searchParams.get(DEFAULT_PAGEINDEX) || DEFAULT_PAGEINDEX_NUMBER.toString()
    const pageSize = searchParams.get(DEFAULT_PAGESIZE) || DEFAULT_PAGESIZE_NUMBER.toString()
    const keyword = searchParams.get(DEFAULT_KEYWORD) || DEFAULT_KEYWORD_VALUE
    setCurrentPageIndex(Number(pageIndex))
    setCurrentPageSize(Number(pageSize))
    setCurrentKeyword(keyword)
    getList(pageIndex, pageSize, keyword)
  }, [searchParams])

  // 获取 list
  const getList = async (pageIndex: string, pageSize: string, keyword: string) => {
    const isDeleted = true
    const result = await getQuestionList(pageIndex, pageSize, keyword, isDeleted)
    if (result.errno === 0) {
      const newList = result.data.list
      setDataSource([...newList])
      setTotal(result.data.total)
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="#108ee9">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]
  const selectChange = (selectedRowKeys: Key[], selectedRows: IAnyJson[]) => {
    setIds([...selectedRowKeys])
  }
  const backEvent = () => {
    setTimeout(() => {
      message.success('恢复成功')
      getList(currentPageIndex.toString(), currentPageSize.toString(), currentKeyword)
    }, 500)
  }
  // 显示 showTotal
  const showTotal = (total: number) => {
    return `共 ${total} 条数据`
  }
  // pagination 改变
  const paginationChange = (pageIndex: number, pageSize: number) => {
    searchParams.set(DEFAULT_PAGEINDEX, pageIndex.toString())
    searchParams.set(DEFAULT_PAGESIZE, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <div className={styles.index}>
      <div className={styles.header}>
        <Title level={3}>回收站</Title>
        <Search />
      </div>
      <div className="content">
        <Space style={{ marginBottom: '20px' }}>
          <Button type="primary" disabled={!ids.length} onClick={backEvent}>
            恢复
          </Button>
          <Button danger disabled={!ids.length}>
            彻底删除
          </Button>
        </Space>
        <Table
          rowKey={item => item._id}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) =>
              selectChange(selectedRowKeys, selectedRows),
          }}
        />
        <Pagination
          showQuickJumper
          showTotal={showTotal}
          current={currentPageIndex}
          defaultPageSize={currentPageSize}
          total={total}
          onChange={paginationChange}
        />
      </div>
    </div>
  )
}

export default Index
