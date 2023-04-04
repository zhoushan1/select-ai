import { Button, Modal, Button, Form, Input } from 'antd';
import styles from './index.module.scss';

export interface FormData {
  [key: string]: any;
}

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: FormData) => void;
}

function PromptModal({ visible, onCancel, onOk }: Props) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={visible}
      title="添加自定义预设"
      onOk={() => {
        form
          .validateFields()
          .then((values: FormData) => {
            onOk(values);
            return values;
          })
          .catch((error) => {
            console.error('提交报错', error);
          });
      }}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="prompt" label="预设" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PromptModal;
