import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  DEFAULT_KEYWORD,
  DEFAULT_KEYWORD_VALUE,
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGEINDEX_NUMBER,
  DEFAULT_PAGESIZE,
  DEFAULT_PAGESIZE_NUMBER,
} from '../../constant'

function Search() {
  const { Search } = Input
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const value = searchParams.get(DEFAULT_KEYWORD) || DEFAULT_KEYWORD_VALUE
  const onSearch = (value: string) => {
    if (pathname === '/manage/list' || '/manage/trash') {
      const pageSize = searchParams.get(DEFAULT_PAGESIZE) || DEFAULT_PAGESIZE_NUMBER.toString()
      searchParams.set(DEFAULT_PAGEINDEX, DEFAULT_PAGEINDEX_NUMBER.toString())
      searchParams.set(DEFAULT_PAGESIZE, pageSize)
      searchParams.set(DEFAULT_KEYWORD, value)
    }
    if (pathname === '/manage/star') {
      searchParams.set(DEFAULT_KEYWORD, value)
    }
    nav({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <>
      <Search
        placeholder="搜索"
        defaultValue={value}
        style={{ width: '260px' }}
        allowClear
        enterButton
        onSearch={onSearch}
      />
    </>
  )
}

export default Search
