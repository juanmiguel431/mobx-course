import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

console.log('it works');

const person = observable({
  firstName: 'Juan Miguel',
  lastName: 'Paulino Carpio'
});

// console.log('Our person is', person);

class Person {
  public firstName: string;
  public lastName: string;

  constructor(name: string, lastName: string) {
    makeObservable(this, {
      firstName: observable,
      lastName: observable
    });

    this.firstName = name;
    this.lastName = lastName;
  }

  public updateFirstName = action((firstName: string) => {
    this.firstName = firstName;
  })

  public updateLastName = action((lastName: string) => {
    this.lastName = lastName;
  })

  public updateFullName = action((firstName: string, lastName: string) => {
    this.firstName = firstName;
    this.lastName = lastName;
  })
}

let newPerson: Person;

async function taskToDemonstrateDifferentTypesOfActions() {
  newPerson = new Person('Luis Miguel', 'Paulino');
  await new Promise(r => setTimeout(r, 3000));

  newPerson.updateFirstName('Lucas Santiago - Using actions');

  await new Promise(r => setTimeout(r, 3000));

  runInAction(() => {
    newPerson.firstName = 'Juan Miguel - Using runInAction Function';
  });

  await new Promise(r => setTimeout(r, 3000));

  const updater = action(() => {
    newPerson.firstName = 'Antonio Marte - Using action function';
  });

  updater();
}

// taskToDemonstrateDifferentTypesOfActions();

// The call of two actions means two different SideEffects or render in React.
async function callingTwoActions() {
  newPerson = new Person('Luis Miguel', 'Paulino');
  await new Promise(r => setTimeout(r, 3000));

  newPerson.updateFirstName('Lucas');
  newPerson.updateLastName('Santiago');
}

// callingTwoActions();


// This will result in just one side effect or render.
async function updatingMultipleObservablesInOneSingleAction() {
  newPerson = new Person('Luis Miguel', 'Paulino');
  await new Promise(r => setTimeout(r, 3000));

  newPerson.updateFullName('Lucas', 'Santiago');
}

// updatingMultipleObservablesInOneSingleAction();


// This will cause the side effect happens more than once.
async function updatingMultipleObservablesUsingAsyncAwait() {
  newPerson = new Person('Luis Miguel', 'Paulino');
  await new Promise(r => setTimeout(r, 3000));

  newPerson.updateFirstName('Lucas');
  await new Promise(r => setTimeout(r, 3000));
  newPerson.updateLastName('Santiago');
}

// updatingMultipleObservablesUsingAsyncAwait();

newPerson = new Person('Juan', 'Miguel');

autorun(() => {
  console.log('Person FullName is ' + newPerson?.firstName + ' ' + newPerson?.lastName);
}, { });

export {};
