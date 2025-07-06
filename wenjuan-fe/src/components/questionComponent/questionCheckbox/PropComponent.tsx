import { useEffect } from 'react'
import { IQuestionCheckbox, ICheckbox } from './interface'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
export default function PropComponent(props: IQuestionCheckbox) {
  const { title, list, isVertical, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical })
  }, [form, title, list, isVertical])
  const changeForm = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name }, index) => {
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, text) => {
                              const { list = [] } = form.getFieldsValue()
                              let num = 0
                              list.forEach((opt: ICheckbox) => {
                                if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                              })
                              if (num === 1) return Promise.resolve()
                              return Promise.reject(new Error('和其他选项重复了'))
                            },
                          },
                        ]}
                      >
                        <Input placeholder="输入选项文字..." />
                      </Form.Item>
                      {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  )
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ value: nanoid(), text: '', checked: false })}
                    icon={<PlusOutlined />}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="排列方向" name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
