import { useEffect, useState } from 'react';
import { Button, Radio, Space } from 'antd';
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { REGULAR_PROMPTS } from '../translation';
import store from '../../store';
import SetPromptModal from '../set-prompt-modal';
import {
  SET_WINDOW_WIDTH,
  SET_WINDOW_HEIGHT,
  QUICK_WINDOW_HEIGHT,
  QUICK_WINDOW_WIDTH,
} from '../../../main/DATA';

function QuickActions() {
  const [setVisible, setSetVisible] = useState(false);
  return (
    <div className={styles.quickActions}>
      <div>
        <Space direction="horizontal">
          {REGULAR_PROMPTS.map((item) => {
            return (
              <Button
                key={item.prompt}
                // icon={<PlusOutlined />}
                size="small"
                onClick={() => {
                  store.homeStore.setCurrentActiveComponent(item.prompt);
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </Space>
      </div>
      <div>
        <Button
          icon={<PlusOutlined />}
          size="small"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('set-size', [
              SET_WINDOW_WIDTH,
              SET_WINDOW_HEIGHT,
            ]);
            setSetVisible(true);
          }}
        />
      </div>
      <SetPromptModal
        visible={setVisible}
        onCancel={() => {
          window.electron.ipcRenderer.sendMessage('set-size', [
            QUICK_WINDOW_WIDTH,
            QUICK_WINDOW_HEIGHT,
          ]);
          setSetVisible(false);
        }}
        onOk={() => {}}
      />
    </div>
  );
}

export default QuickActions;
