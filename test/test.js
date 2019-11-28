const chai = require('chai')
//const mocha = require('mocha')
const sinon = require('sinon')

chai.use(require('sinon-chai'));

const expect = chai.expect;

require('./preparations.js')

const experimental = require('../public/main.js')
const data = require('./data.js')

const startTesting = async () => {
  describe('Парсер:', function() {
    it('Парсер работает' , () => {
     let weather = experimental.weatherParser(data.weather);
     expect(JSON.stringify(weather)).to.equal(JSON.stringify(data.processed_weather));
    })
  })
  describe('OpenWeather', function() {
   it('Обработчик успешных запросов к API OpenWeather работает' , async () => {
     let result = await experimental.weatherSearch('Moscow', () => {return Promise.resolve(data.weather)});
     expect(JSON.stringify(result)).to.equal(JSON.stringify(data.weather));
    })
    it('Обработчик ошибочных запросов к API OpenWeather работает' , async () => {
      let result = await experimental.weatherSearch('Urzigstan', () => {return Promise.resolve(data.weather_error)});
      expect(result).to.equal(null);
    })
  })
  describe('Вызов функции отрисовки результатов', function() {
    it('Шаблонизатор вызывается' , () => {
      let dotSpy = sinon.spy(doT, 'template')
      experimental.resultsDisplay('param','value')
      expect(dotSpy).to.have.been.calledOnce
      dotSpy.restore()
    })
    it('Параметры передаются', () => {
      let resultsDisplaySpy = sinon.spy(experimental, 'resultsDisplay')
      experimental.resultsDisplay('param','value')
      expect(resultsDisplaySpy).to.have.been.calledWith('param','value')
      resultsDisplaySpy.restore()
    })
    it('Отрисовка происходит верно', () => {
      const expectedResult = '<div class="res_block"> <img src="img/Weather.png" alt=""> <div>Weather: clear sky</div> </div>'
      const realResult = experimental.resultsDisplay('Weather','clear sky')
      expect(realResult).equal(expectedResult);
    });
  })
  describe('Вызов функции отрисовки ошибки', function() {
    it('Шаблонизатор вызывается' , () => {
      let dotSpy = sinon.spy(doT, 'template')
      experimental.printError('Error Text')
      expect(dotSpy).to.have.been.calledOnce
      dotSpy.restore()
    })
    it('Параметры передаются', () => {
      let printErrorSpy = sinon.spy(experimental, 'printError')
      experimental.printError('Error Text')
      expect(printErrorSpy).to.have.been.calledWith('Error Text')
      printErrorSpy.restore()
    })
    it('Отрисовка происходит верно', () => {
      const expectedResult = '<H1 id="err_mes"> Ошибка при обращении к API OpenWeatherMap </H1>'
      const realResult = experimental.printError('Ошибка при обращении к API OpenWeatherMap')
      expect(realResult).equal(expectedResult);
    });
  })
}

startTesting();
