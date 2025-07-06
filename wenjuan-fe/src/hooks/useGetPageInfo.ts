import { useSelector } from "react-redux"
import { IState } from "../store"
import { IPageInfo } from "../store/pageInfoReducer"
function useGetPageInfo() {
  const pageInfo = useSelector<IState>(state => state.pageInfo) as IPageInfo
  return pageInfo
}

export default useGetPageInfo
