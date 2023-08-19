import { action, autorun, makeObservable, observable, when, computed } from 'mobx';

class Person {
  public firstName: string | null = null;
  public lastName: string | null = null;
  public age: number | null = null;
  public isAlive: boolean | null = true;
  public dollars: number = 10;

  constructor(props: Partial<Person>) {
    Object.assign<Person, Partial<Person>>(this, props);

    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      age: observable,
      isAlive: observable,
      dollars: observable,
      euros: computed,
      updateFirstName: action,
      updateLastName: action,
      updateFullName: action,
      setAge: action,
      setDollars: action,
      bury: action,
      withdrawl: action
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

  public setDollars(dollars: number) {
    this.dollars = dollars;
  }

  public bury() {
    this.isAlive = false;
  }

  public withdrawl() {
    this.dollars = this.dollars - 1;
  }

  get euros() {
    console.log('Euros Getter');
    return this.dollars * 2;
  }
}

let person: Person;
person = new Person({ firstName: 'Juan Miguel', lastName: 'Paulino Carpio' });

const disposerReaction2 = autorun(() => {
  console.log(`autorun: Person FullName is ${person?.firstName} ${person?.lastName} dollars: ${person?.dollars} euros: ${person.euros}`);
});

person.setDollars(100);

person.withdrawl();
person.withdrawl();
person.withdrawl();
person.withdrawl();

disposerReaction2();

export {};
