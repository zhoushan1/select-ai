import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import App from './App';
import store from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Provider {...store}>
    <App />
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log('index.ts中', arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
