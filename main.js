const apiKey = "73a01b01449a61e8570455ac5c8be00e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const inputForm = document.querySelector("#inputForm");
const buttonForm = document.querySelector("#buttonForm");

inputForm.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    this.checkWeater(inputForm.value);
  }
});

buttonForm.addEventListener("click", () => {
  this.checkWeater(inputForm.value);
});

async function checkWeater(_city) {
  const url = `${apiUrl}&q=${_city}&appid=${apiKey}`;

  const response = await fetch(url);

  let data = await response.json();

  if (!data) return;

  document.querySelector("#city").innerHTML = data.name;
  document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";

  document.querySelector("#humidity").innerHTML =
    Math.round(data.main.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(data.wind.speed) + " km/h";

  let src = "";

  switch (data.weather[0].main) {
    case "Clouds":
      src = "images/clouds.png";
      break;

    case "Clear":
      src = "images/clear.png";
      break;

    case "Rain":
      src = "images/rain.png";
      break;

    case "Drizzle":
      src = "images/drizzle.png";
      break;

    case "Mist":
      src = "images/mist.png";
      break;
  }

  document.querySelector("#weaterIcon").src = src;
}

checkWeater("caracas");
