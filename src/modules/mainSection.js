import createTodayWeatherPanel from './todayWeatherPanel'

export default function generateMainSection() {
    const main = document.createElement('main');
    main.id = 'main-section';
    return main;
}

export async function displayForecastForSelectedLocation(locationObject) {
    const weatherHolder = document.createElement('div');
    const forecastDataForThisLocation = await fetchCurrentWeatherData(locationObject);
    weatherHolder.append(createTodayWeatherPanel(forecastDataForThisLocation))

    document.getElementById('main-section').append(weatherHolder)

}

async function fetchCurrentWeatherData(locationObject) {
    const response = await fetch(`${locationObject.currentWeatherURL}`, { mode: 'cors' });
    const responseJson = await response.json();
    return responseJson
}