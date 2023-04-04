import { observable, action, makeAutoObservable } from 'mobx';

export interface CustomPromptItem {
  name: string;
  prompt: string;
}

class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable currentActiveComponent = '';

  @observable customPromptList: CustomPromptItem[] = [];

  @action setCurrentActiveComponent = (key: string) => {
    this.currentActiveComponent = key;
  };

  @action setCustomPromptList = (data: CustomPromptItem[]) => {
    this.customPromptList = data;
  };
}
const homeStore = new HomeStore();

export default homeStore;
