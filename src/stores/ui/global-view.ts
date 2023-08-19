import RootStore from '../root-store';
import { makeObservable, observable } from 'mobx';

export default class GlobalView {
  public isLoading: boolean = false;
  public themeColor: string = 'dark';
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      isLoading: observable,
      themeColor: observable
    })
  }
}
