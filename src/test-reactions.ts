import { action, autorun, makeObservable, observable, reaction, when } from 'mobx';

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
      () => {
        console.log('when')
        this.bury();
      }
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

let newPerson: Person;
newPerson = new Person({ firstName: 'Juan Miguel', lastName: 'Paulino Carpio' });


const disposerReaction1 = reaction(
  () => newPerson?.isAlive === false,
  () => console.log('reaction: RIP')
);

const disposerReaction2 = autorun(() => {
  // await new Promise(r => setTimeout(r, 3000));
  console.log(`autorun: Person FullName is ${newPerson?.firstName} ${newPerson?.lastName} age: ${newPerson?.age} isAlive: ${newPerson?.isAlive}`);
});

newPerson.setAge(100);

disposerReaction1();
disposerReaction2();

export {};
