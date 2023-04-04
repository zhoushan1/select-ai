import { Button, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PromptSetting from './prompt-setting';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}
function SetPromptModal({ visible, onCancel, onOk }: Props) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `提示词`,
      children: <PromptSetting />,
    },
    {
      key: '2',
      label: `其他`,
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      width="80%"
      footer={null}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Modal>
  );
}

export default SetPromptModal;
