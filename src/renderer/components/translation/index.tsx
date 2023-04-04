/* eslint-disable promise/always-return */
import { useState, useEffect } from 'react';
import { Button, Input, message, Tooltip, Radio } from 'antd';
import { CopyOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.module.scss';
import fetchChatData from '../../api/chat';
import PromptModal, { FormData } from '../prompt-modal';

const { TextArea } = Input;

interface Props {
  // eslint-disable-next-line react/require-default-props
  copyText?: string;
  defaultSelectValue?: string;
}
const CUSTOM_PROMPT_STORE = 'customPromptList';

export const REGULAR_PROMPTS = [
  {
    name: '总结',
    prompt: `Reply in Chinese. Summarize the following as concisely as possible, output as ordered list:\n `,
  },
  {
    name: '翻译',
    prompt: `Translate the following into Chinese and only show me the translated content.If it is already in Chinese,translate it into English and only show me the translated content:\n`,
  },
  {
    name: '代码释义',
    prompt: `Reply in Chinese.Explain the following code:\n `,
  },
  {
    name: '转TS',
    prompt: `Please convert the following data to TypeScript format and output it:\n `,
  },
];

function addStore(data: FormData) {
  const originalData = window.electron.store.get(CUSTOM_PROMPT_STORE) || [];
  if (
    originalData.filter((item: FormData) => item.prompt === data.prompt)
      .length > 0
  ) {
    message.error('预设不能重复~');
    return;
  }
  if (originalData) {
    originalData.push(data);
    window.electron.store.set(CUSTOM_PROMPT_STORE, originalData);
  } else {
    const list = [];
    list.push(data);
    window.electron.store.set(CUSTOM_PROMPT_STORE, list);
  }
}

function removeStore(data?: FormData) {
  const originalData = window.electron.store.get(CUSTOM_PROMPT_STORE);
  if (originalData) {
    if (!data) {
      const newList = originalData.slice(0, -1);
      window.electron.store.set(CUSTOM_PROMPT_STORE, newList);
    }
  }
}

function Translation({ copyText, defaultSelectValue }: Props) {
  const [selectValue, setSelectValue] = useState(defaultSelectValue || '');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [hasCopy, setHasCopy] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customList, setCustomList] = useState<any[]>([]);

  useEffect(() => {
    const customListStore =
      window.electron.store.get(CUSTOM_PROMPT_STORE) || [];
    if (customListStore) {
      setCustomList(customListStore);
    }
  }, []);

  useEffect(() => {
    if (copyText) {
      setInputValue(copyText);
    }
  }, [copyText]);

  const fetchData = (prompt: string) => {
    setOutputValue('loading...');
    fetchChatData({
      content: prompt,
    })
      .then((data: any) => {
        const resObj = data.choices[0];
        if (resObj) {
          setOutputValue(resObj.message.content);
        }
      })
      .catch((error) => {
        setOutputValue('');
        console.error(error);
      });
  };

  const handleChange = (val: string) => {
    fetchData(`${val}${inputValue}`);
  };

  const changeCustom = (type: string, data?: FormData) => {
    const newList = JSON.parse(JSON.stringify(customList));
    if (type === 'add') {
      if (
        newList.filter((item: FormData) => item.prompt === data?.prompt)
          .length > 0
      ) {
        message.error('预设不能重复~');
        return;
      }
      newList.push(data);
      setCustomList(newList);
    }
    if (type === 'del') {
      const curList = newList.slice(0, -1);
      setCustomList(curList);
    }
  };

  const handleAddModal = (values: FormData) => {
    setShowModal(false);
    changeCustom('add', values);
    addStore(values);
  };

  return (
    <div className={styles.translation}>
      <div className={styles.title}>
        <div>Select Ai</div>
        <div>
          <Tooltip title={hasCopy ? '已复制' : '复制结果'}>
            <CopyToClipboard
              text={outputValue}
              onCopy={() => {
                setHasCopy(true);
              }}
            >
              <Button
                type="link"
                icon={
                  <CopyOutlined
                    style={{ color: hasCopy ? '#52c41a' : 'unset' }}
                  />
                }
              />
            </CopyToClipboard>
          </Tooltip>
        </div>
      </div>
      <div>
        <TextArea
          rows={4}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className={styles.actionTitleWrap}>
        <div className={styles.actionTitle}>快捷方式</div>
        <div>
          <Tooltip title="添加预设">
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={() => setShowModal(true)}
            />
          </Tooltip>
          <Tooltip title="删除预设">
            <Button
              type="link"
              icon={<MinusOutlined />}
              onClick={() => {
                changeCustom('del');
                removeStore();
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.actionWrap}>
        <Radio.Group
          defaultChecked={false}
          value={selectValue}
          onChange={(e) => {
            if (!inputValue) {
              message.warning('请先输入要处理的内容');
              return;
            }
            setSelectValue(e.target.value);
            handleChange(e.target.value);
          }}
        >
          {/* <Radio.Button value="summary">AI总结</Radio.Button>
          <Radio.Button value="translate">翻译</Radio.Button>
          <Radio.Button value="code">代码释义</Radio.Button>
          <Radio.Button value="ts">转成TS</Radio.Button> */}
          {[...REGULAR_PROMPTS, ...customList].map((item, index) => (
            <Radio.Button value={item.prompt} key={item.prompt}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div className={styles.resultTitle}>结果</div>
      <div>
        <TextArea
          rows={4}
          autoSize={{ minRows: 4 }}
          value={outputValue}
          onChange={(e) => {
            setHasCopy(false);
            setOutputValue(e.target.value);
          }}
        />
      </div>
      <PromptModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleAddModal}
      />
    </div>
  );
}

export default Translation;
