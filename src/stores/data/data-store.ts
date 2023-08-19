import RootStore from '../root-store';
import TodoStore from './todo-store';
import UserStore from './user-store';

export default class DataStore {
  todoStore: TodoStore;
  userStore: UserStore;

  constructor(rootStore: RootStore) {
    this.todoStore = new TodoStore(rootStore);
    this.userStore = new UserStore(rootStore);
  }
}
