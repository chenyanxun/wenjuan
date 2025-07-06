import styles from './editHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, CheckOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'
import { resetTitle } from '../../../store/pageInfoReducer'
import { useState } from 'react'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
const { Title } = Typography
// 问卷标题显示和修改
const TitleElement = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [tip, setTip] = useState(false)
  const changeTip = () => {
    setTip(true)
  }
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const newTitle = e.target.value.trim()
    dispatch(resetTitle(newTitle))
  }
  if (tip) {
    return (
      <Input
        value={title}
        onPressEnter={() => setTip(false)}
        onBlur={() => setTip(false)}
        onChange={e => setTitle(e)}
      ></Input>
    )
  }
  return (
    <Space>
      <Title level={3} style={{ marginBottom: '0' }}>
        {title}
      </Title>
      <Button icon={<EditOutlined />} onClick={changeTip}></Button>
    </Space>
  )
}
// 问卷保存
const SaveQuestion = () => {
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )
  useKeyPress(['ctrl.s', 'meta.s'], e => {
    e.preventDefault()
    if (!loading) save()
  })
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )
  return (
    <Button type="default" icon={loading ? <LoadingOutlined /> : <CheckOutlined />} onClick={save}>
      保存
    </Button>
  )
}
// 问卷发布
const PublishButton = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={pub}>
      发布
    </Button>
  )
}

export default function EditHeader() {
  const navigate = useNavigate()
  return (
    <div className={styles.editHeader}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
            返回
          </Button>
          <TitleElement />
        </Space>
      </div>
      <div className={styles.center}>
        <EditToolbar />
      </div>
      <div className={styles.right}>
        <Space>
          <SaveQuestion />
          <PublishButton />
        </Space>
      </div>
    </div>
  )
}
