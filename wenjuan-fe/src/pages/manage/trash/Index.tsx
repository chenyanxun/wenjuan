import { Typography, Table, Space, Button, Tag } from 'antd'
import styles from '../index.module.scss'
const { Title } = Typography
function Index() {
  const dataSource = [
    {
      _id: 1,
      title: '问卷1',
      isStar: true,
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
      isStar: true,
      isPublished: false,
      answerCount: 0,
      createdAt: '2月11日 13:11',
    },
    {
      _id: 6,
      title: '问卷4',
      isStar: true,
      isPublished: false,
      answerCount: 0,
      createdAt: '2月11日 13:11',
    },
  ]
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

  return (
    <div className={styles.index}>
      <div className={styles.header}>
        <Title level={3}>回收站</Title>
        <div>搜索</div>
      </div>
      <div className="content">
        <Space style={{ marginBottom: '20px' }}>
          <Button type="primary">恢复</Button>
          <Button danger>彻底删除</Button>
        </Space>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={item => item._id}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              console.log(selectedRowKeys)
            },
          }}
        />
      </div>
      <div className="footer">加载更多</div>
    </div>
  )
}

export default Index
