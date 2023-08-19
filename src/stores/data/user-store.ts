import RootStore from '../root-store';
import { makeObservable, observable } from 'mobx';

export class User {}

export default class UserStore {
  public list: User[] = [];
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      list: observable
    });
  }
}
