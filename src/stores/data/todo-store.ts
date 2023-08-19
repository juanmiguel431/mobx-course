import RootStore from '../root-store';
import { makeObservable, observable } from 'mobx';

export class Todo {}

export default class TodoStore {
  public list: Todo[] = [];
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      list: observable
    });
  }
}
