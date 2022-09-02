import compassIcon from '../assets/icons/compass-n.svg'
import clearSkyBackground from '../assets/background-images/clear sky.jpg'
import { format } from 'date-fns'


export function createCurrentWeatherMainPanel(weatherData, cityName) {
    const currentWeatherPanel = document.createElement('section')
    currentWeatherPanel.id = 'current-weather-panel';
    currentWeatherPanel.classList.add('main', 'current', 'weather-panel', `${conditionsIdIntoString(weatherData.weather[0].id)}`)

    const weatherPanelTopLine = document.createElement('div')
    weatherPanelTopLine.id = 'current-weather-panel-top-line';
    weatherPanelTopLine.append(createCityName(cityName), createFetchDate())

    const weatherPanelMiddleLine = document.createElement('div')
    weatherPanelMiddleLine.id = 'current-weather-panel-middle-line';
    weatherPanelMiddleLine.append(createCurrentTemp(weatherData.main.temp), (createCurrentDescription(weatherData.weather[0].description)));

    const weatherPanelBottomLine = document.createElement('div')
    weatherPanelBottomLine.id = 'current-weather-panel-bottom-line';
    weatherPanelBottomLine.append(createCurrentPressure(weatherData.main.pressure), createCurrentRain(weatherData), createCurrentWind(weatherData.wind.speed))

    currentWeatherPanel.append(
        weatherPanelTopLine,
        weatherPanelMiddleLine,
        weatherPanelBottomLine
    );

    return currentWeatherPanel;
}

function createCityName(city) {
    const cityName = document.createElement('h3');
    cityName.id = 'current-weather-city';
    cityName.classList.add('main', 'current', 'weather-panel', 'city')
    cityName.innerText = city;
    
    const currentCityIcon = document.createElement('div');
    currentCityIcon.id = 'current-weather-city-icon';

    cityName.append(currentCityIcon);

    return cityName
}

function createFetchDate() {
    const fetchDate = document.createElement('p');
    fetchDate.id = 'current-weather-date';
    fetchDate.classList.add('main', 'current', 'weather-panel', 'date')
    fetchDate.innerText = `Today, ${format(new Date(), 'H:mm')}`;
    return fetchDate
}

function createCurrentTemp(temp) {
    const currentTemp = document.createElement('h2');
    currentTemp.id = 'current-weather-temp';
    currentTemp.classList.add('main', 'current', 'weather-panel', 'temp')
    currentTemp.innerText = stringIntoTemp(temp);
    return currentTemp
}

function createCurrentDescription(description) {
    const currentDescription = document.createElement('h3');
    currentDescription.id = 'current-weather-description';
    currentDescription.classList.add('main', 'current', 'weather-panel', 'description')
    currentDescription.innerText = description;

    return currentDescription
}

function createCurrentPressure(pressure) {
    const currentPressure = document.createElement('p');
    currentPressure.id = 'current-weather-pressure';
    currentPressure.classList.add('main', 'current', 'weather-panel', 'pressure')
    currentPressure.innerText = pressure;

    const currentPressureIcon = document.createElement('div');
    currentPressureIcon.id = 'current-weather-pressure-icon';

    currentPressure.prepend(currentPressureIcon);
    return currentPressure
}

function createCurrentRain(weatherData) {
    const currentRain = document.createElement('p');
    currentRain.id = 'current-weather-rain';
    currentRain.classList.add('main', 'current', 'weather-panel', 'rain')
    return (weatherData.rain != null) ? currentRain.innerText = `${weatherData[rain][0]}` : currentRain.innerText = 0;  // mało widoczne w dom, uwaga ;)
}

function createCurrentWind(windSpeed) {
    const currentWindSpeed = document.createElement('p');
    currentWindSpeed.id = 'current-weather-wind-speed';
    currentWindSpeed.classList.add('main', 'current', 'weather-panel', 'wind-speed')
    currentWindSpeed.innerText = windSpeed;

    return currentWindSpeed
}

function stringIntoTemp(temp) {
    return Math.round(temp)
}

export function conditionsIdIntoString(conditions) {
    if (conditions >= 200 && conditions < 300) {
        return 'thunderstorm'
    } else if (conditions >= 300 && conditions < 400) {
        return 'drizzle'
    } else if (conditions >= 500 && conditions < 600) {
        return 'rain'
    } else if (conditions >= 600 && conditions < 700) {
        return 'snow'
    } else if (conditions >= 700 && conditions < 800) {
        return 'atmosphere'
    } else if (conditions === 800) {
        return 'clear'
    } else if (conditions > 800 && conditions < 900) {
        return 'clouds'
    }
}

export function createCurrentWindPanel(weatherData) {
    const windPanel = document.createElement('section');
    windPanel.id = 'current-weather-wind-panel';
    windPanel.classList.add('main', 'current', 'weather-panel-small', 'wind');

    const windSpeed = document.createElement('p'); //  [meter / s]
    windSpeed.id = 'current-weather-wind-speed';
    windSpeed.classList.add('main', 'current', 'weather-panel-small', 'wind', 'speed');
    windSpeed.innerText = weatherData.wind.speed;

    const windDirection = document.createElement('img'); // deg
    windDirection.id = 'current-weather-wind-dir';
    windDirection.classList.add('main', 'current', 'weather-panel-small', 'wind', 'dir');
    windDirection.src = compassIcon;
    windDirection.style.rotate = `${weatherData.wind.deg}deg`;

    windPanel.append(windSpeed, windDirection)
    return windPanel
}

export function createCurrentTempMinMaxPanel(weatherData) {
    const minMaxTempPanel = document.createElement('section');
    minMaxTempPanel.id = 'current-weather-temp-minmax-panel';
    minMaxTempPanel.classList.add('main', 'current', 'weather-panel-small', 'minmaxtemp');
    const currentTempMinMax = document.createElement('p');
    currentTempMinMax.id = 'current-weather-temp-min-max';
    currentTempMinMax.classList.add('main', 'current', 'weather-panel', 'temp', 'min-max')
    currentTempMinMax.innerText = `${stringIntoTemp(weatherData.main.temp_min)} - ${stringIntoTemp(weatherData.main.temp_max)}`;
    minMaxTempPanel.append(currentTempMinMax)
    return minMaxTempPanel
}