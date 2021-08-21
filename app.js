//input and button
let inputEl = document.getElementById('locationInput');
document.getElementById('button-addon2').addEventListener('click', getWeather);

//card elements
const cardEl = document.querySelector('.card');
const locationEl = document.querySelector('#location');
const descriptionEl = document.querySelector('#description');
const tempEl = document.querySelector('#temp');
const feelsLikeEl = document.querySelector('#feels-like');
const windSpeedEl = document.querySelector('#wind-speed');
const imgEl = document.querySelector('#img');

async function getWeather() {
    const locationName = inputEl.value;
    inputEl.value = '';

    const result = await request(locationName);

    //location
    const nearestLocation = result.nearest_area[0];
    const city = nearestLocation.region[0].value;
    const country = nearestLocation.country[0].value;
    //data
    const currCondition = result.current_condition[0];
    const temp = currCondition.temp_C;
    const feelsLike = currCondition.FeelsLikeC;
    const windSpeed = currCondition.windspeedKmph;
    //icon and img
    const weatherCode = currCondition.weatherCode;
    const icon = findIcon(weatherCode);
    const img = findImg(weatherCode);

    //filling in the data
    imgEl.src = img;
    locationEl.textContent = city + ', ' + country;
    descriptionEl.textContent = icon.join(', ');
    tempEl.textContent = 'Temperature: ' + temp + ' °C';
    feelsLikeEl.textContent = 'Feels like: ' + feelsLike + ' °C';
    windSpeedEl.textContent = 'Wind speed: ' + windSpeed + ' km/h';

    //showing card
    cardEl.classList.remove('hidden');
}

async function request(locationName) {
    const api = `https://wttr.in/${locationName}?format=j1`;
    let weatherRequest = await fetch(api, {
        method: 'GET'
    });
    let weatherResult = await weatherRequest.json();
    return weatherResult;
}

function findWeatherDescriptionByCode(code) {

    const WWO_CODE = {
        "113": "Sunny",
        "116": "PartlyCloudy",
        "119": "Cloudy",
        "122": "VeryCloudy",
        "143": "Fog",
        "176": "LightShowers",
        "179": "LightSleetShowers",
        "182": "LightSleet",
        "185": "LightSleet",
        "200": "ThunderyShowers",
        "227": "LightSnow",
        "230": "HeavySnow",
        "248": "Fog",
        "260": "Fog",
        "263": "LightShowers",
        "266": "LightRain",
        "281": "LightSleet",
        "284": "LightSleet",
        "293": "LightRain",
        "296": "LightRain",
        "299": "HeavyShowers",
        "302": "HeavyRain",
        "305": "HeavyShowers",
        "308": "HeavyRain",
        "311": "LightSleet",
        "314": "LightSleet",
        "317": "LightSleet",
        "320": "LightSnow",
        "323": "LightSnowShowers",
        "326": "LightSnowShowers",
        "329": "HeavySnow",
        "332": "HeavySnow",
        "335": "HeavySnowShowers",
        "338": "HeavySnow",
        "350": "LightSleet",
        "353": "LightShowers",
        "356": "HeavyShowers",
        "359": "HeavyRain",
        "362": "LightSleetShowers",
        "365": "LightSleetShowers",
        "368": "LightSnowShowers",
        "371": "HeavySnowShowers",
        "374": "LightSleetShowers",
        "377": "LightSleet",
        "386": "ThunderyShowers",
        "389": "ThunderyHeavyRain",
        "392": "ThunderySnowShowers",
        "395": "HeavySnowShowers",
    };

    return Object.entries(WWO_CODE).find(el => el[0] == code);
}

function findIcon(code) {

    const weatherDescription = findWeatherDescriptionByCode(code);

    const WEATHER_SYMBOL = {
        "Unknown": "✨",
        "Cloudy": "☁️",
        "Fog": "🌫",
        "HeavyRain": "🌧",
        "HeavyShowers": "🌧",
        "HeavySnow": "❄️",
        "HeavySnowShowers": "❄️",
        "LightRain": "🌦",
        "LightShowers": "🌦",
        "LightSleet": "🌧",
        "LightSleetShowers": "🌧",
        "LightSnow": "🌨",
        "LightSnowShowers": "🌨",
        "PartlyCloudy": "⛅️",
        "Sunny": "☀️",
        "ThunderyHeavyRain": "🌩",
        "ThunderyShowers": "⛈",
        "ThunderySnowShowers": "⛈",
        "VeryCloudy": "☁️",
    };

    return Object.entries(WEATHER_SYMBOL).find(el => el[0] == weatherDescription[1]);
}

function findImg(code) {

    const weatherDescription = findWeatherDescriptionByCode(code);

    const imgs = {
        "Unknown": "./img/Default.jpg",
        "Cloudy": "./img/Cloudy.jpg",
        "Fog": "./img/Fog.jpg",
        "HeavyRain": "./img/RainShowers.jpg",
        "HeavyShowers": "./img/RainShowers.jpg",
        "HeavySnow": "./img/SnowSleet.jpg",
        "HeavySnowShowers": "./img/SnowSleet.jpg",
        "LightRain": "./img/RainShowers.jpg",
        "LightShowers": "./img/RainShowers.jpg",
        "LightSleet": "./img/SnowSleet.jpg",
        "LightSleetShowers": "./img/SnowSleet.jpg",
        "LightSnow": "./img/SnowSleet.jpg",
        "LightSnowShowers": "./img/SnowSleet.jpg",
        "PartlyCloudy": "./img/PartlyCloudy.jpg",
        "Sunny": "./img/Sunny.jpg",
        "ThunderyHeavyRain": "./img/Thundery.jpg",
        "ThunderyShowers": "./img/Thundery.jpg",
        "ThunderySnowShowers": "./img/Thundery.jpg",
        "VeryCloudy": "./img/VeryCloudy.jpg",
    };

    const img = Object.entries(imgs).find(el => el[0] == weatherDescription[1]);
    return img[1];
}
