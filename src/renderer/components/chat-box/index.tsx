import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.scss';
import fetchChatData from '../../api/chat';

interface DataItem {
  type: string;
  content: string;
  id: string;
}

type TypeProp = 'user' | 'robot';

const containerHeight = 600;
const itemHeight = 54;

const scrollToBottom = (itemCount: number) => {
  const container = document.querySelector('.rc-virtual-list');

  // // 获取容器中的滚动条对象
  const scrollBar = document.querySelector('.rc-virtual-list-scrollbar-thumb');
  if (!scrollBar || !container) return;
  // 获取滚动条的高度
  const scrollBarHeight = scrollBar.getBoundingClientRect().height;
  // 获取滚动条的滚动距离
  const scrollBarScrollTop = scrollBar.getBoundingClientRect().top;
  const listHighlight = itemHeight * itemCount;

  // 计算滚动到底部的距离
  const scrollTop = listHighlight - scrollBarHeight - scrollBarScrollTop;
  console.log(
    '外面只',
    scrollTop,
    listHighlight,
    scrollBarHeight,
    scrollBarScrollTop
  );
  scrollBar.style.top = `${scrollTop}px`;
  // 使用 scrollTo() 方法实现平滑滚动
  // scrollBar.scrollTo({
  //   top: scrollTop,
  //   behavior: 'smooth',
  // });
};

function ChatBox() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addData = (content: string, type: TypeProp) => {
    setMessages((prevArray) => [
      ...prevArray,
      {
        id: uuidv4(),
        type,
        content,
      },
    ]);
  };

  const handleSend = () => {
    addData(inputText, 'user');
    setInputText('');

    setLoading(true);
    fetchChatData({
      content: inputText,
    })
      .then((data: any) => {
        const resObj = data.choices[0];
        // eslint-disable-next-line promise/always-return
        if (resObj) {
          const resContent = resObj.message.content;
          addData(resContent, 'robot');
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const renderItem = (item: DataItem) => {
    if (item.type === 'user') {
      return (
        <List.Item style={{ textAlign: 'right' }}>
          <div className={`${styles.contentBox} ${styles.userBox}`}>
            {item.content}
          </div>
        </List.Item>
      );
    }
    return (
      <List.Item style={{ textAlign: 'left' }}>
        <div className={`${styles.contentBox} ${styles.robotBox}`}>
          {item.content}
        </div>
      </List.Item>
    );
  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      containerHeight
    ) {
      // appendData();
    }
  };

  return (
    <div className={styles.chatBox}>
      <List split={false} itemLayout="horizontal">
        <VirtualList
          data={messages}
          height={containerHeight}
          itemHeight={itemHeight}
          itemKey="id"
          // onScroll={onScroll}
        >
          {(item) => renderItem(item)}
        </VirtualList>
      </List>
      <div className={styles.sendBox}>
        <Input
          style={{ flex: 1 }}
          value={inputText}
          onChange={handleInputChange}
          onPressEnter={handleSend}
        />
        <Button
          type="primary"
          onClick={handleSend}
          loading={loading}
          style={{ marginLeft: 6 }}
        >
          发送
        </Button>
      </div>
    </div>
  );
}

export default ChatBox;
