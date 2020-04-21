'use strict'

class Time {
  create () {
    return new Date()
  }

  get () {
    return this.create().toLocaleTimeString()
  }

  get hour () {
    return this.create().getHours()
  }

  get hourFormatted () {
    return this.getShift() === 'PM' && this.hour > 12
      ? this.hour - 24 + 12
      : this.hour
  }

  getShift (string = this.get()) {
    const z = string.length - 1
    const x = string.length - 2
    return `${string[x]}${string[z]}`
  }

  define () {
    clock.textContent = time.get()
  }
}

const time = new Time()

class Greeting {
  #pathFile = 'resources/images/';

  constructor (greeting = 'Hello', file = 'error.png') {
    this.greeting = greeting
    this.link = `${this.#pathFile}${file}`
  }

  run () {
    message.textContent = `${this.greeting}`
    catImage.setAttribute('src', this.link)
  }

  verify () {
    message.textContent === this.greeting
      ? console.log('works :)')
      : console.log('dont works')
  }
}

class Response {
  #hour = time.hourFormatted;
  #currentTime = time.define();
  #shift = time.getShift(this.#currentTime);
  // not is necessary put it in a constructor

  twelveClock () {
    const shiftAM = () => this.#hour < 4
      ? eveningGreet.run()
      : morningGreet.run()

    const shiftPM = () => this.#hour > 4 && this.#hour !== 12
      ? eveningGreet.run()
      : afternoonGreet.run()

    return this.#shift === 'AM'
      ? shiftAM()
      : shiftPM()
  }

  twentyClock () {
    const notMorning = () => this.#hour > 11 && this.#hour < 18
      ? afternoonGreet.run()
      : eveningGreet.run()

    return this.#hour > 4 && this.#hour < 12
      ? morningGreet.run()
      : notMorning()
  }

  run () {
    return this.#shift === 'AM' || this.#shift === 'PM'
      ? this.twelveClock()
      : this.twentyClock()
  }
}

class Party {
  start () {
    const partyGreet = new Greeting('Parttyyyy!', 'party.gif')
    partyGreet.run()
    console.log('the party began')
    setTimeout(party.stop, 4500)
  }

  stop () {
    response.run()
    console.log('the party finished')
  }
}

class Modal {
  #modals = document.querySelectorAll('.modal')
  #hour = `${time.hourFormatted} ${time.getShift()}`

  constructor (index, item, closeButton) {
    this.index = index
    this.item = item
    this.closeButton = closeButton
  }

  get modal () {
    return this.#modals[this.index]
  }

  showModal () {
    this.modal.classList.add('show')
    modalContainer.classList.add('show')
  }

  schedule () {
    if (this.#hour === this.item.value) this.showModal()
  }

  update () {
    this.item.addEventListener('input', () => {
      this.schedule()
    })
  }

  close () {
    this.closeButton.addEventListener('click', () => {
      const showedModal = document.querySelector('.modal.show')

      modalContainer.classList.remove('show')
      showedModal.classList.remove('show')
    })
  }
}

class Execute {
  wakeUp () {
    const wakeUpModal = new Modal(0, wakeUpTime, closeWakeUp)
    wakeUpModal.schedule()
    wakeUpModal.update()
    wakeUpModal.close()
  }

  lunch () {
    const lunchModal = new Modal(1, lunchTime, closeLunch)
    lunchModal.schedule()
    lunchModal.update()
    lunchModal.close()
  }

  nap () {
    const napModal = new Modal(2, napTime, closeNap)
    napModal.schedule()
    napModal.update()
    napModal.close()
  }
}

class Checker {
  #errorWarning = new Greeting('404', 'error.png');

  isRunning () {
    setInterval(time.define, 1000)
    console.log('the program is working :) ')
  }

  isNotRunning () {
    clock.textContent = 'Sorry for the errors'
    this.#errorWarning.run()
    console.log('its not working :(')
  }

  run () {
    clock.textContent !== 'Invalid Date'
      ? this.isRunning()
      : this.isNotRunning()
  };
}

const items = {
  clock: document.querySelector('.time'),
  catImage: document.querySelector('.cat-display > img'),
  message: document.querySelector('.message'),
  partyButton: document.querySelector('.btn')
}

const { clock, catImage, message, partyButton } = items

time.define()

const morningGreet = new Greeting('Good Morning', 'cat-yawning.jpg')
const afternoonGreet = new Greeting('Good Afternoon', 'cat-reading.png')
const eveningGreet = new Greeting('Good Evening', 'cat-in-computer.jpg')

const response = new Response()
response.run()

const checker = new Checker()
checker.run()

const party = new Party()
partyButton.addEventListener('click', party.start)

const selector = {
  wakeUpTime: document.querySelector('#wake-up-time'),
  lunchTime: document.querySelector('#lunch-time'),
  napTime: document.querySelector('#nap-time'),
  modalContainer: document.querySelector('.modal-container'),
  closeWakeUp: document.querySelector('.modal:nth-child(1) > .btn-x'),
  closeLunch: document.querySelector('.modal:nth-child(2) > .btn-x'),
  closeNap: document.querySelector('.modal:nth-child(3) > .btn-x')
}

const { wakeUpTime, lunchTime, napTime, modalContainer, closeWakeUp, closeLunch, closeNap } = selector

const execute = new Execute()

execute.wakeUp()
execute.lunch()
execute.nap()
