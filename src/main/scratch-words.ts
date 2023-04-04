import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  globalShortcut,
  clipboard,
} from 'electron';
import { QUICK_WINDOW_WIDTH, QUICK_WINDOW_HEIGHT } from './DATA';

export default class ScratchWords {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    globalShortcut.register('CommandOrControl+Shift+S', () => {
      // 处理事件
      // 读取系统剪贴板内容
      const selection = clipboard.readText();
      console.log('触发快捷键', selection);
      // 写入文本到系统剪贴板
      clipboard.writeText(selection);
      this.openNewWindow(selection);
    });
  }

  openNewWindow(copyText: string) {
    // 创建新窗口
    this.mainWindow.show();
    this.mainWindow.setSize(QUICK_WINDOW_WIDTH, QUICK_WINDOW_HEIGHT);
    this.mainWindow.webContents.send('ipc-example', [copyText]);
  }
}
