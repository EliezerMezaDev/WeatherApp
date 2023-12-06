const apiKey = "73a01b01449a61e8570455ac5c8be00e";
const apiUrl = "https://api.openweathermap.org/data/2.5/";

const unit = "metric";

export async function getWeaterByCity(_city) {
  const url = `${apiUrl}weather?units=${unit}&q=${_city}&appid=${apiKey}`;

  const response = await fetch(url);

  return await response.json();
}

export async function getForecastByCity(_city) {
  const url = `${apiUrl}forecast?units=${unit}&q=${_city}&appid=${apiKey}`;

  const response = await fetch(url);

  return await response.json();
}
