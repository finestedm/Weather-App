import { createCurrentWeatherMainPanel, createCurrentWindPanel, createCurrentTempMinMaxPanel } from './currentWeatherPanels'
import { highlightCurrentLocationButton } from './sideNavbar'

export default function generateMainSection() {
    const main = document.createElement('main');
    main.id = 'main-section';
    return main;
}

export async function displayForecastForSelectedLocation(locationObject) {
    try {
        document.getElementById('main-section').innerHTML = ''; // clearing main before appending different city forecast
    } catch { }

    const weatherHolder = document.createElement('div');
    weatherHolder.id = 'main--weather-panel-wrapper';
    const forecastDataForThisLocation = await fetchCurrentWeatherData(locationObject);
    weatherHolder.append(
        createCurrentWeatherMainPanel(forecastDataForThisLocation),
        createCurrentWindPanel(forecastDataForThisLocation),
        createCurrentTempMinMaxPanel(forecastDataForThisLocation)
    )

    document.getElementById('main-section').append(weatherHolder)

    highlightCurrentLocationButton(locationObject.name)
}

async function fetchCurrentWeatherData(locationObject) {
    const response = await fetch(`${locationObject.currentWeatherURL}`, { mode: 'cors' });
    const responseJson = await response.json();
    return responseJson
}