import compassIcon from '../assets/icons/compass-n.svg'

export function createCurrentWeatherMainPanel(weatherData) {
    const currentWeatherPanel = document.createElement('section')
    currentWeatherPanel.id = 'current-weather-panel';
    currentWeatherPanel.classList.add('main', 'current', 'weather-panel')
    currentWeatherPanel.setAttribute('dataset', `${setBackgroundColorBasedOnWeather(weatherData.weather[0].id)}`)

    console.log(weatherData) // delete later

    currentWeatherPanel.append(
        createCurrentTemp(weatherData.main.temp),
        createCurrentDescription(weatherData.weather[0].description),
        createCurrentPressure(weatherData.main.pressure)
        //add time of sync 
    );
    return currentWeatherPanel;
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

    return currentPressure
}

function stringIntoTemp(temp) {
    return Math.round(temp)
}

function setBackgroundColorBasedOnWeather(conditions) {
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
    
    return currentTempMinMax
}