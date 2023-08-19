// # Each todo should have:
//     - id
//     - name
//     - isCompleted
// # Each todo should be able to move between completed and not completed state
// # Each todo should be able to update the name
// # Print Log on Todo completed state change
// # Add ability to add and remove todo
// # Add ability to get list of completed todos and not completed todos
// # Print log every time new todo is added or removed with the current status: total, completed, incomplete
// # Print log only once when all todos are completed

import { action, autorun, computed, IReactionDisposer, makeObservable, observable, reaction, when } from 'mobx';

let todoId: number = 0;

class Todo {
  public id: number = ++todoId;
  public name: string | null = null;
  public isCompleted: boolean = false;
  private readonly reactionDisposer: IReactionDisposer;

  constructor(name: string) {
    makeObservable(this, {
      name: observable,
      isCompleted: observable,
      updateName: action,
      toggleCompletedState: action,
    });

    this.name = name;

    this.reactionDisposer = reaction(
      (r) => this.isCompleted,
      () => {
        console.log(`Todo ${this.name} is in state ${this.isCompleted}`);
      }
    );
  }

  dispose() {
    this.reactionDisposer()
  }

  public toggleCompletedState = () => {
    this.isCompleted = !this.isCompleted;
  }

  public updateName = (name: string) => {
    this.name = name;
  }
}

class TodoList {
  public todoList: Todo[] = [];
  private readonly reactionDisposer: IReactionDisposer;

  constructor() {
    makeObservable(this, {
      todoList: observable,
      completed: computed,
      pending: computed,
      add: action,
      remove: action
    });

    this.reactionDisposer = reaction(
      () => this.todoList.length,
      () => {
        console.log(`Todo list change: Total: ${this.todoList.length} Pending: ${this.pending.length} Completed: ${this.completed.length}`);
      }
    );

    when(
      () => this.pending.length === 0 && this.completed.length > 0,
      () => {
        console.log('Todo list is completed');
      }
    )
  }

  public dispose() {
    this.reactionDisposer();
  }

  public add = (name: string) => {
    this.todoList.push(new Todo(name));
  }

  public getByName = (name: string) => {
    return this.todoList.find(t => t.name === name);
  }

  public remove = (name: string) => {
    const todoIndex = this.todoList.findIndex(p => p.name === name);
    if (todoIndex === -1) return;

    const todo = this.todoList[todoIndex];
    todo.dispose();

    this.todoList.splice(todoIndex, 1);
  }

  get completed() {
    return this.todoList.filter(p => p.isCompleted);
  }

  get pending() {
    return this.todoList.filter(p => !p.isCompleted);
  }
}

const todoList = new TodoList();


const autorunDisposer = autorun(() => {
  // console.log()
});

todoList.add('Task 1');
todoList.add('Task 2');

const task1 = todoList.getByName('Task 1');
const task2 = todoList.getByName('Task 2');

if (task1) {
  task1.toggleCompletedState();
}

if (task2) {
  task2.toggleCompletedState();
}

todoList.remove('Task 1');

autorunDisposer();

// to make peace with typescript :D - remove when u start
export {};
