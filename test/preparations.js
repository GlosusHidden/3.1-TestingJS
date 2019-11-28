const data = require('./data.js')
const doT = require('dot')

global.doT = doT

global.document = {
  getElementById: (arg) => {
    return {
      innerHTML: () => '',
      insertAdjacentHTML: () => '',
      addEventListener: () => '',
      appendChild: () => ''
    };
  },
  createElement: (arg) => {
    return {
      innerHTML: '',
      id: '',
      className: ''
    };
  }
};

global.event = {
  preventDefault: () => '',
  target: { "myInput": { value: 'Moscow' } }
}

global.console = {
  log: () => ''
}

global.fetch_to_weather_api = () => { return Promise.resolve(data.weather) }
