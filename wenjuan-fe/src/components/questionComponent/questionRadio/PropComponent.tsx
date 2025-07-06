import { useEffect } from 'react'
import { IOption, IQuestionRadio } from './interface'
import { Form, Input, Select, Checkbox, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
export default function PropComponent(props: IQuestionRadio) {
  const [form] = Form.useForm()
  const { title, value, options = [], isVertical, onChange, disabled } = props
  useEffect(() => {
    form.setFieldsValue({ title, value, isVertical, options })
  }, [form, title, value, isVertical, options])
  const changeForm = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, value, isVertical, options }}
      onValuesChange={changeForm}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项内容' },
                        {
                          validator(_, text) {
                            const { options } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: IOption) => {
                              if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..."></Input>
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ value: nanoid(), text: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中项" name="value">
        <Select
          value={value}
          options={options.map(({ value, text }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item label="排列方向" name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
