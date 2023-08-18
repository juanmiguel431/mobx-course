import { action, autorun, makeObservable, observable, when } from 'mobx';


class Person {
  public firstName: string | null = null;
  public lastName: string | null = null;
  public age: number | null = null;
  public isAlive: boolean | null = true;

  constructor(props: Partial<Person>) {
    Object.assign<Person, Partial<Person>>(this, props);

    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      age: observable,
      isAlive: observable
    });

    when(
      () => this.age != null && this.age > 99,
      () => this.bury()
    );
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

  public setAge = action((age: number) => {
    this.age = age;
  })

  public bury = action(() => {
    this.isAlive = false;
  })

}


let newPerson: Person = new Person({ firstName: 'Juan Miguel', lastName: 'Paulino Carpio' });
newPerson.setAge(65);

autorun(() => {
  console.log(`Person FullName is ${newPerson?.firstName} ${newPerson?.lastName} age: ${newPerson.age} isAlive: ${newPerson.isAlive}`);
}, { });

export {};
