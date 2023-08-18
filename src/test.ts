import { makeObservable, observable } from 'mobx';

console.log('it works');

const person = observable({
  firstName: 'Juan Miguel',
  lastName: 'Paulino Carpio'
});

console.log('Our person is', person);

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
}

const newPerson = new Person('Luis Miguel', 'Paulino');

console.log('Class base person', newPerson);


export {};
