const ow_link = 'https://api.openweathermap.org/data/2.5/weather?'
const ow_appid = '73a2f4a5254e97adabb2160caa6234a8'

let fetch_to_weather_api = async (city) => {
  const response = await fetch(ow_link + 'q=' + city + '&appid=' + ow_appid)
  const data = await response.json()
  return data;
}

let resultTemplate = '<div class="res_block"> <img src="img/{{=it.param}}.png" alt=""> <div>{{=it.value}}</div> </div>';
let errorTemplate = '<H1 id="err_mes"> {{=it.str}} </H1>';

if (typeof global !== 'undefined') {
  fetch_to_weather_api = global.fetch_to_weather_api
}

const weatherSearch = async (city, weather_search_function) => {
  let res = await weather_search_function(city);
  return (parseInt(res.cod) === 200) ? res : null;
}

const weatherParser = (resFromAPI) => {
  let res = {};
  let KelvinsInCelsius = 273.15;
  res.temp = Math.round(parseFloat(resFromAPI.main.temp) - KelvinsInCelsius);
  res.pressure = resFromAPI.main.pressure;
  res.humidity = resFromAPI.main.humidity;
  res.weather = resFromAPI.weather[0].description;
  res.wind = resFromAPI.wind.speed;
  return res;
}

const resultsDisplay = (param, value) => {
  let result_template = doT.template(resultTemplate);
  let label = param[0].toUpperCase() + param.slice(1) + ': ' + value;
  let compTemp = result_template({
      param: param,
      value: label
  	})
  document.getElementById('result_blocks').insertAdjacentHTML('beforeend', compTemp);
  console.log(compTemp);
  return compTemp;
}

const printError = (str) => {
  let error_template = doT.template(errorTemplate);
	let compTemp = error_template({
		str: str
	})
	document.getElementById('result_blocks').insertAdjacentHTML('beforeend', compTemp);
  return compTemp;
}

const formSubmit = async (event) => {
  event.preventDefault();
	document.getElementById('result_blocks').innerHTML = '';
	let text = event.target['myInput'].value;
  let weatherRes = await weatherSearch(text, fetch_to_weather_api);
  if (!weatherRes) {
		printError('Ошибка при обращении к API OpenWeatherMap');
		return;
	}
  console.log(weatherRes);
  let finalData = weatherParser(weatherRes);
	for (i in finalData) {
		resultsDisplay(i, finalData[i])
	}
	return;
}

const documentReady = () => document.getElementById('search_block').addEventListener('submit', formSubmit);

if (typeof module !== 'undefined'){
  module.exports = {
    weatherSearch: weatherSearch,
    weatherParser: weatherParser,
    resultsDisplay: resultsDisplay,
    printError: printError,
    formSubmit: formSubmit
  };
}
