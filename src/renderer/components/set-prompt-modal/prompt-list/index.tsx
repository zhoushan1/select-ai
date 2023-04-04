import { useState } from 'react';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import styles from './index.module.scss';
import homeStore, { CustomPromptItem } from '../../../store/home';

interface Props {
  list: CustomPromptItem[];
  onEdit?: (item: CustomPromptItem) => void;
}

function PromptList({ list, onEdit }: Props) {
  const [activeId, setActiveId] = useState('');
  const handleClick = (item: CustomPromptItem) => {
    setActiveId(item.prompt);
    onEdit?.(item);
  };
  return (
    <div className={styles.promptList}>
      <div>
        {list.map((item) => {
          return (
            <div
              key={item.prompt}
              className={styles.promptItem}
              onClick={() => handleClick(item)}
            >
              <Button type={activeId === item.prompt ? 'primary' : 'default'}>
                {item.name}
              </Button>
            </div>
          );
        })}
      </div>
      <div className={styles.action}>
        <Space>
          <Button icon={<PlusOutlined />} size="small" onClick={() => {}} />
          <Button icon={<MinusOutlined />} size="small" onClick={() => {}} />
        </Space>
      </div>
    </div>
  );
}

export default observer(PromptList);
