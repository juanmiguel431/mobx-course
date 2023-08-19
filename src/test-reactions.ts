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
      isAlive: observable,
      setAge: action,
      bury: action,
      updateFullName: action,
      updateFirstName: action,
      updateLastName: action,
    });

    when(
      () => this.age != null && this.age > 99,
      () => {
        console.log('when')
        this.bury();
      }
    );
  }

  public updateFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public updateLastName(lastName: string) {
    this.lastName = lastName;
  }

  public updateFullName(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public setAge(age: number) {
    this.age = age;
  }

  public bury() {
    this.isAlive = false;
  }
}

let person: Person;
person = new Person({ firstName: 'Juan Miguel', lastName: 'Paulino Carpio' });

const disposerReaction1 = reaction(
  () => person?.isAlive === false,
  () => console.log('reaction: RIP')
);

const disposerReaction2 = autorun(async () => {
  // await new Promise(r => setTimeout(r, 3000));
  // console.log(newPerson);
  console.log(`autorun: Person FullName is ${person?.firstName} ${person?.lastName} age: ${person?.age} isAlive: ${person?.isAlive}`);
});

person.updateFullName('Nicola', 'Tesla');

// newPerson.setAge(100);

disposerReaction1();
disposerReaction2();

export {};
