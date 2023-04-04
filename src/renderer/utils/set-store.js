import { message } from 'antd';

export function addPromptStore(key: string, data: any) {
  const originalData = window.electron.store.get(key) || [];
  if (
    originalData.filter((item: FormData) => item.prompt === data.prompt)
      .length > 0
  ) {
    message.error('预设不能重复~');
    return;
  }
  if (originalData) {
    originalData.push(data);
    window.electron.store.set(key, originalData);
  } else {
    const list = [];
    list.push(data);
    window.electron.store.set(key, list);
  }
}

export function removeStore(data?: any) {
  const originalData = window.electron.store.get(CUSTOM_PROMPT_STORE);
  if (originalData) {
    if (!data) {
      const newList = originalData.slice(0, -1);
      window.electron.store.set(CUSTOM_PROMPT_STORE, newList);
    }
  }
}
