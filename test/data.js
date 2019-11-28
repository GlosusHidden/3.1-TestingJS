let weather = {
  "coord": {
    "lon": 37.62,
    "lat": 55.75
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 280.72,
    "pressure": 1012,
    "humidity": 87,
    "temp_min": 280.15,
    "temp_max": 281.15
  },
  "visibility": 10000,
  "wind": {
    "speed": 4,
    "deg": 150
  },
  "clouds": {
    "all": 93
  },
  "dt": 1573480415,
  "sys": {
    "type": 1,
    "id": 9029,
    "country": "RU",
    "sunrise": 1573448137,
    "sunset": 1573479089
  },
  "timezone": 10800,
  "id": 524901,
  "name": "Moscow",
  "cod": 200
}

weather_error = {
  "cod": "404",
  "message": "city not found"
}

processed_weather = {
  "temp": 8,
  "pressure": 1012,
  "humidity": 87,
  "weather": "overcast clouds",
  "wind": 4
}

module.exports.weather = weather;
module.exports.weather_error = weather_error;
module.exports.processed_weather = processed_weather;
