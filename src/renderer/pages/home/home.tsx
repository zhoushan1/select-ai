import { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.scss';
import Translation from '../../components/translation';
import ChatBox from '../../components/chat-box';
import QuickActions from '../../components/quick-actions';

type ComponentsName = 'ChatBox' | 'Translation' | 'QuickActions';

function Home() {
  const [currentComponent, setCurrentComponent] =
    useState<ComponentsName>('QuickActions');
  const [copyText, setCopyText] = useState<string>('');

  const updateComponent = useCallback((type: ComponentsName) => {
    setCurrentComponent(type);
  }, []);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'ChatBox':
        return <ChatBox />;
      case 'Translation':
        return <Translation copyText={copyText} />;
      case 'QuickActions':
        return <QuickActions />;
      default:
        return <QuickActions />;
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-example', (...arg: unknown[]) => {
      const copy: any = arg[0] || '';
      setCopyText(copy);
      updateComponent('QuickActions');
    });

    return () => {
      // 记得在卸载组件前移除监听
      // window.electron.ipcRenderer.removeListener('update-data');
    };
  }, [updateComponent]);

  return <div className={styles.home}>{renderComponent()}</div>;
}

export default observer(Home);
