import { Button, Space, Form, Input } from 'antd';
import { useEffect } from 'react';
import styles from './index.module.scss';
import homeStore, { CustomPromptItem } from '../../../store/home';

export interface FormData {
  [key: string]: any;
}

interface Props {
  defaultData?: CustomPromptItem;
  onCancel: () => void;
  onOk: (values: CustomPromptItem) => void;
}

function PromptForm({ onCancel, onOk, defaultData }: Props) {
  const [form] = Form.useForm();

  const onSave = () => {
    form
      .validateFields()
      .then((values: CustomPromptItem) => {
        onOk(values);
        return values;
      })
      .catch((error) => {
        console.error('提交报错', error);
      });
  };

  useEffect(() => {
    if (defaultData) {
      form.setFieldsValue(defaultData);
    }
  }, [defaultData, form]);

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="prompt" label="提示词" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default PromptForm;
