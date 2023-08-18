import { action, autorun, makeObservable, observable } from 'mobx';

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
    });

    this.firstName = name;
    this.lastName = lastName;
  }

  public updateFirstName = action((name: string) => {
    this.firstName = name;
  })
}


async function task() {
  newPerson = new Person('Luis Miguel', 'Paulino');
  await new Promise(r => setTimeout(r, 3000));
  newPerson.updateFirstName('Lucas');
}

let newPerson: Person;
task();

autorun(() => {
  console.log('Person name is ' + newPerson.firstName);
})

export {};
