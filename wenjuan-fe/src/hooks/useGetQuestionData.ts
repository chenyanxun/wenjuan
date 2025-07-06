import { useEffect, useState } from 'react'
import { getQuesiontService } from '../services/question'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentReducer'
import { resetPageInfo } from '../store/pageInfoReducer'
function useGetQuestionData() {
  const [data, setData] = useState<any>({})
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    fetchData()
    async function fetchData() {
      const data = await getQuesiontService(id)
      if (data.errno === 0) {
        setData({
          ...data.data,
        })
      }
    }
  }, [id])
  useEffect(() => {
    if (!data) return
    const { title = '', desc = '', js = '', css = '', componentList = [] } = data
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    dispatch(resetComponents({ componentList, selectedId, copyComponent: null }))
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])
  return data
}

export default useGetQuestionData
