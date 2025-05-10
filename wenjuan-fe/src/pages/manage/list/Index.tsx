import { Pagination, Typography } from 'antd'
import QuestionCard from '../../../components/questionCard/QuestionCard'
import styles from '../index.module.scss'
import Search from '../../../components/search/Search'
import { useEffect, useState } from 'react'
import { getQuestionList } from '../../../services/question'
import { IAnyJson } from '../../../type'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  DEFAULT_KEYWORD,
  DEFAULT_KEYWORD_VALUE,
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGEINDEX_NUMBER,
  DEFAULT_PAGESIZE,
  DEFAULT_PAGESIZE_NUMBER,
} from '../../../constant'
const { Title } = Typography
function Index() {
  const [searchParams] = useSearchParams()
  const [list, setList] = useState<IAnyJson[]>([])
  const [total, setTotal] = useState()
  const [currentPageIndex, setCurrentPageIndex] = useState(DEFAULT_PAGEINDEX_NUMBER)
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGESIZE_NUMBER)
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const pageIndex = searchParams.get(DEFAULT_PAGEINDEX) || DEFAULT_PAGEINDEX_NUMBER.toString()
    const pageSize = searchParams.get(DEFAULT_PAGESIZE) || DEFAULT_PAGESIZE_NUMBER.toString()
    const keyword = searchParams.get(DEFAULT_KEYWORD) || DEFAULT_KEYWORD_VALUE
    setCurrentPageIndex(Number(pageIndex))
    setCurrentPageSize(Number(pageSize))
    getList(pageIndex, pageSize, keyword)
  }, [searchParams])

  // 获取 list
  const getList = async (pageIndex: string, pageSize: string, keyword: string) => {
    const result = await getQuestionList(pageIndex, pageSize, keyword)
    if (result.errno === 0) {
      const newList = result.data.list
      setList([...newList])
      setTotal(result.data.total)
    }
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
        <Title level={3}>我的问卷</Title>
        <Search />
      </div>
      <div className="content">
        {list.map((item: IAnyJson) => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <Pagination
        showQuickJumper
        showTotal={showTotal}
        current={currentPageIndex}
        defaultPageSize={currentPageSize}
        total={total}
        onChange={paginationChange}
      />
    </div>
  )
}

export default Index
