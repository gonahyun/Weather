const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

//현재 위치 날씨
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const APIKey = "170acf1c124eeaca2b20b9f3ce97533b";

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`
      )
        .then((response) => response.json())
        .then((json) => {
          updateWeatherData(json);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }
}

// 날씨 업데이트
function updateWeatherData(json) {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "img/clear.png";
      break;
    case "Rain":
      image.src = "img/rainy.png";
      break;
    case "Snow":
      image.src = "img/snow.png";
      break;
    case "Clouds":
      image.src = "img/cloud.png";
      break;
    case "Mist":
    case "Haze":
      image.src = "img/mist.png";
      break;
    default:
      image.src = "img/cloud.png";
  }

  temperature.innerHTML = `${Math.round(json.main.temp)}<span>˚C</span>`;
  description.textContent = json.weather[0].description;
  humidity.textContent = `${json.main.humidity}%`;
  wind.textContent = `${Math.round(json.wind.speed)}Km/h`;
}

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  if (city === "") {
    getCurrentLocationWeather(); //위치 입력 안했을 경우 현재 위치 날씨
  } else {
    const APIKey = "170acf1c124eeaca2b20b9f3ce97533b";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        updateWeatherData(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});

// 페이지 로드시 현재 위치의 날씨
window.addEventListener("load", getCurrentLocationWeather);
