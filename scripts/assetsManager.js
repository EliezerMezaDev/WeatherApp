const weathers = [
  {
    name: "Clear sky",
    time: "day",
    moment: "",
    url: "assets/v02/weathers/day-clear-sky.svg",
    code: ["01d"],
  },
  {
    name: "Clear sky",
    time: "night",
    moment: "",
    url: "assets/v02/weathers/night-clear-sky.svg",
    code: ["01n"],
  },
  {
    name: "Few clouds",
    time: "day",
    moment: "",
    url: "assets/v02/weathers/day-few-cloud.svg",
    code: ["02d"],
  },
  {
    name: "Few clouds",
    time: "night",
    moment: "",
    url: "assets/v02/weathers/night-few-cloud.svg",
    code: ["02n"],
  },
  {
    name: "Scattered clouds",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/scattered-clouds.svg",
    code: ["03d", "03n"],
  },
  {
    name: "Broken clouds",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/broken-clouds.svg",
    code: ["04d", "04n"],
  },
  {
    name: "Shower rain",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/shower-rain.svg",
    code: ["09d", "09n"],
  },
  {
    name: "Rain",
    time: "day",
    moment: "",
    url: "assets/v02/weathers/day-shower-rain.svg",
    code: ["10d"],
  },
  {
    name: "Rain",
    time: "night",
    moment: "",
    url: "assets/v02/weathers/night-shower-rain.svg",
    code: ["10n"],
  },
  {
    name: "Thunderstorm",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/thunderstorm.svg",
    code: ["11d", "11n"],
  },
  {
    name: "Snow",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/snow.svg",
    code: ["13d", "13n"],
  },
  {
    name: "Mist",
    time: "all day",
    moment: "",
    url: "assets/v02/weathers/mist.svg",
    code: ["50d", "50n"],
  },
];

export async function getWeaterIcon(_weatherCode) {


  const foundWeather = weathers.find((weather) =>
    weather.code.includes(_weatherCode)
  );

  if (!foundWeather) return weathers[0].url;

  return foundWeather.url;
}
