// getter and setter

class Person {
  constructor (name, age, occupation) {
    this._name = name
    this._age = age
    this._occupation = occupation
  }

  get name () {
    return this._name
  }

  set name (newName) {
    this._name = newName
  }
}

const Matheus = new Person('Matheus', 17, 'Programmer')
console.log(Matheus)
