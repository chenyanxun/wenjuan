import { Typography } from 'antd'
import QuestionCard from '../../../components/questionCard/QuestionCard'
import styles from '../index.module.scss'
const { Title } = Typography
function Index() {
  const list = [
    {
      _id: 1,
      title: '问卷1',
      isStar: false,
      isPublished: false,
      answerCount: 0,
      createdAt: '2月11日 13:11',
    },
    {
      _id: 2,
      title: '问卷2',
      isStar: true,
      isPublished: true,
      answerCount: 23,
      createdAt: '2月11日 13:11',
    },
    {
      _id: 3,
      title: '问卷3',
      isStar: false,
      isPublished: false,
      answerCount: 0,
      createdAt: '2月11日 13:11',
    },
    {
      _id: 4,
      title: '问卷4',
      isStar: true,
      isPublished: false,
      answerCount: 0,
      createdAt: '2月11日 13:11',
    },
  ]

  return (
    <div className={styles.index}>
      <div className={styles.header}>
        <Title level={3}>我的问卷</Title>
        <div>搜索</div>
      </div>
      <div className="content">
        {list.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className="footer">加载更多</div>
    </div>
  )
}

export default Index
