import { Button, Typography } from 'antd'
import QuestionCard from '../../../components/questionCard/QuestionCard'
import styles from '../index.module.scss'
import Search from '../../../components/search/Search'
import { useEffect, useState } from 'react'
import { IAnyJson } from '../../../type'
import {
  DEFAULT_KEYWORD,
  DEFAULT_KEYWORD_VALUE,
  DEFAULT_PAGEINDEX_NUMBER,
  DEFAULT_PAGESIZE_NUMBER,
} from '../../../constant'
import { useSearchParams } from 'react-router-dom'
import { getQuestionList } from '../../../services/question'
const { Title } = Typography
function Index() {
  const [list, setList] = useState<IAnyJson[]>([])
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGEINDEX_NUMBER)
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()
  const hasMoreData = total > list.length
  const keyword = searchParams.get(DEFAULT_KEYWORD) || DEFAULT_KEYWORD_VALUE
  // 根据keyword，重置数据
  useEffect(() => {
    setList([])
    setPageIndex(DEFAULT_PAGEINDEX_NUMBER)
    setTotal(0)
  }, [keyword])
  // 首次加载数据
  useEffect(() => {
    getList(pageIndex.toString(), DEFAULT_PAGESIZE_NUMBER.toString(), keyword)
  }, [])
  const getList = async (pageIndex: string, pageSize: string, keyword: string) => {
    const isStar = true
    const result = await getQuestionList(pageIndex, pageSize, keyword, isStar)
    if (result.errno === 0) {
      const newList = result.data.list
      setList([...list, ...newList])
      setTotal(result.data.total)
    }
  }
  const addMoreEvent = () => {
    setPageIndex(pageIndex + 1)
  }
  return (
    <div className={styles.index}>
      <div className={styles.header}>
        <Title level={3}>我的问卷</Title>
        <Search />
      </div>
      <div className="content">
        {list.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className="footer">
        {hasMoreData ? (
          <Button type="text" onClick={addMoreEvent}>
            加载更多
          </Button>
        ) : (
          '没有数据了'
        )}
      </div>
    </div>
  )
}

export default Index
