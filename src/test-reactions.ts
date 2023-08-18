import { action, autorun, makeObservable, observable } from 'mobx';


class Person {
  public firstName: string = '';
  public lastName: string = '';

  constructor(props: Partial<Person>) {
    Object.assign(this, props);

    makeObservable(this, {
      firstName: observable,
      lastName: observable
    });
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


let newPerson: Person = new Person({ firstName: 'Juan Miguel', lastName: 'Paulino Carpio' });

autorun(() => {
  console.log('Person FullName is ' + newPerson?.firstName + ' ' + newPerson?.lastName);
}, { });

export {};
