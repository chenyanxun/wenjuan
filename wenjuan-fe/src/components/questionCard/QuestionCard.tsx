import { Button, Divider, Popconfirm, Space, Tag, Modal } from 'antd'
import styles from './questionCard.module.scss'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  StockOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { IAnyJson } from '../../type'
const { confirm } = Modal

function QuestionCard(props: IAnyJson) {
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props
  const confirmCopy = (id: number) => {
    console.log('复制', id)
  }
  const confirmDel = (id: number) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: '删除',
      content: '确定要删除该问卷吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  return (
    <div className={styles.questionCard}>
      <div className={styles.top}>
        <div>
          <Space>
            {isStar && <StarOutlined style={{ color: 'red' }} />}
            <div className={styles.title}>
              <Link to={'/question/edit/' + _id}>{title}</Link>
            </div>
          </Space>
        </div>
        <div>
          <Space>
            {isPublished ? <Tag color="#108ee9">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className={styles.bottom}>
        <div>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />}>
              编辑问卷
            </Button>
            <Button
              disabled={isPublished ? false : true}
              type="text"
              size="small"
              icon={<StockOutlined />}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div>
          <Space>
            <Button type="text" size="small" icon={<StarOutlined />}>
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="复制"
              description="确定要复制该问卷吗？"
              onConfirm={() => confirmCopy(_id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                confirmDel(_id)
              }}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
