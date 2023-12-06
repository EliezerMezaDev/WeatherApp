import { getWeaterByCity, getForecastByCity } from "./conexion.js";
import { getWeaterIcon } from "./assetsManager.js";

/*
    ---- weather functions ----
*/
async function checkWeater(_city) {
  let currentWeatherData = await getWeaterByCity(_city);

  if (!currentWeatherData || currentWeatherData.cod === "404") return;

  document.querySelector("#dataCity").innerHTML = currentWeatherData.name;
  document.querySelector("#dataTemp").innerHTML = Math.round(
    currentWeatherData.main.temp
  );

  document.querySelector("#humidity").innerHTML =
    Math.round(currentWeatherData.main.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(currentWeatherData.wind.speed) + " km/h";
  document.querySelector("#realFeel").innerHTML =
    Math.round(currentWeatherData.main.feels_like) + " °C";

  document.querySelector("#maxminTemp").innerHTML = `${Math.round(
    currentWeatherData.main.temp_max
  )}/${Math.round(currentWeatherData.main.temp_min)} °C`;

  document.querySelector("#weaterIcon").src = await getWeaterIcon(
    currentWeatherData.weather[0].icon
  );
}

/*
    ---- forecast functions ----
*/

let todayForecast = [];
let weekForecast = [];

const todayForecastContent = document.querySelector("#todayForecastContent");

async function checkForecast(_city) {
  let currentCityForecast = await getForecastByCity(_city);

  if (!currentCityForecast) return;

  const now = new Date();
  const today = now.toLocaleString();

  currentCityForecast.list.forEach((forecast) => {
    let date = new Date(forecast.dt_txt);
    date = date.toLocaleString();
    date = date.split(", ")[0];

    if (date === today.split(", ")[0]) {
      todayForecast.push(forecast);
    }
  });

  generateForecastItems();
}

function generateForecastItems() {
  todayForecast.forEach(async (forecast) => {
    const article = document.createElement("article");
    article.className = "forecast";

    const h5 = document.createElement("h5");
    h5.className = "forecast__title";

    const forecastDate = new Date(forecast.dt_txt);

    let h = forecastDate.getHours() + "";
    let m = forecastDate.getMinutes() + "";

    if (h.length == 1) h = `0${h}`;
    if (m.length == 1) m = `0${m}`;

    h5.textContent = `${h}:${m}`;

    const img = document.createElement("img");
    img.src = await getWeaterIcon(forecast.weather[0].icon);
    img.alt = "forecast";
    img.className = "forecast__icon";

    const p = document.createElement("p");
    p.className = "forecast__temp";
    p.setAttribute("unit", "°C");
    p.textContent = Math.round(forecast.main.temp);

    article.appendChild(h5);
    article.appendChild(img);
    article.appendChild(p);

    todayForecastContent.appendChild(article);
  });

  todayForecast.length = 0;
  weekForecast.length = 0;
}

/*
    ---- general functions ----
*/
const inputForm = document.querySelector("#searchInput");
const buttonForm = document.querySelector("#searchButton");
const clockLabel = document.querySelector("#clock");

function clock() {
  setInterval(() => {
    const now = new Date();

    let date = `${now.getUTCDate()}/${now.getMonth()}/${now.getUTCFullYear()}`;

    let h = now.getHours() + "";
    let m = now.getMinutes() + "";
    let s = now.getSeconds() + "";

    if (h.length == 1) h = `0${h}`;
    if (m.length == 1) m = `0${m}`;
    if (s.length == 1) s = `0${s}`;

    const nowTime = `${h}:${m}:${s}, ${date}`;

    clockLabel.innerHTML = nowTime;
  }, 1000);
}

inputForm.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    todayForecastContent.innerHTML = "";

    checkWeater(inputForm.value);
    checkForecast(inputForm.value);

    inputForm.value = "";
  }
});

buttonForm.addEventListener("click", () => {
  checkWeater(inputForm.value);
  checkForecast(inputForm.value);

  inputForm.value = "";
});

function init() {
  clock();

  checkWeater("caracas");
  checkForecast("caracas");
}

init();
