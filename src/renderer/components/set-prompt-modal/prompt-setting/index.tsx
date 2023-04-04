import { useState } from 'react';
import { observer } from 'mobx-react';
import { message } from 'antd';
import { cloneDeep } from 'lodash-es';
import PromptList from '../prompt-list';
import styles from './index.module.scss';
import PromptForm from '../prompt-form';
import homeStore, { CustomPromptItem } from '../../../store/home';

function PromptSetting() {
  const { customPromptList } = homeStore;
  const [defaultData, setDefaultData] = useState<
    CustomPromptItem | undefined
  >();

  const handleSave = (values: CustomPromptItem) => {
    console.log('表单值', values, customPromptList, homeStore);
    const filerList = customPromptList.filter(
      (item) => item.prompt === values.prompt
    );
    const newList = cloneDeep(customPromptList);
    if (filerList.length > 0) {
      // 编辑
      message.error('预设不能重复');
      const curIndex = newList.findIndex(
        (item) => item.prompt === values.prompt
      );
      if (curIndex !== -1) {
        newList[curIndex] = values;
        homeStore.setCustomPromptList(newList);
      }
      return;
    }
    // 新增
    newList.push(values);
    homeStore.setCustomPromptList(newList);
    console.log('最新的值store', customPromptList);
  };

  const handleEdit = (values: CustomPromptItem) => {
    setDefaultData(values);
  };
  return (
    <div className={styles.promptSetting}>
      <div className={styles.promptLeft}>
        <PromptList list={customPromptList} onEdit={handleEdit} />
      </div>
      <div className={styles.promptRight}>
        <PromptForm
          onCancel={() => {}}
          onOk={handleSave}
          defaultData={defaultData}
        />
      </div>
    </div>
  );
}

export default observer(PromptSetting);
