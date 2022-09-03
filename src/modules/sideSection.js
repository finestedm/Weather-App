import { format, fromUnixTime } from 'date-fns'
import getUnixTime from 'date-fns/getUnixTime'
import { stringIntoTemp } from './currentWeatherPanels';
import { conditionsIdIntoString } from "./currentWeatherPanels";
import { getIconSvgURL } from './location-icons'

export default function generateSideWeekForecastSection() {
    const sideWeekForecastSection = document.createElement('aside');
    sideWeekForecastSection.id = 'side-week-forecast-section';
    return sideWeekForecastSection;
}
export async function displayFiveDayForecastForSelectedLocation(locationObject) {
    const asideSection = document.getElementById('side-week-forecast-section');
    try {
        asideSection.innerHTML = ''; // clearing side section before appending different city forecast
    } catch { }

    const weatherHolder = document.createElement('div');
    weatherHolder.id = 'aside--weather-panel-wrapper';

    const weatherHolderTodayPart = document.createElement('section');
    weatherHolderTodayPart.id = 'aside--today';
    const weatherHolderTodayPartHeader = document.createElement('h3'); //
    weatherHolderTodayPartHeader.innerText = 'Today';
    weatherHolderTodayPart.append(weatherHolderTodayPartHeader);


    const weatherHolderFiveDaysPart = document.createElement('section');
    weatherHolderFiveDaysPart.id = 'aside--five-days';

    const forecastDataForThisLocation = await fetchFiveDayWeatherData(locationObject);

    forecastDataForThisLocation.list.forEach(singleForecastInterval => {
        checkIfForecastForToday(singleForecastInterval) ? weatherHolderTodayPart.append(createTodayForecastDiv(singleForecastInterval)) : weatherHolderFiveDaysPart.append(createFiveDayForecastDiv(singleForecastInterval));
    })

    weatherHolder.append(weatherHolderTodayPart, weatherHolderFiveDaysPart);
    asideSection.append(weatherHolder);
}

export async function fetchFiveDayWeatherData(locationObject) {
    const response = await fetch(`${locationObject.fiveDayWeatherURL}`, { mode: 'cors' });
    const responseJson = await response.json();
    return responseJson
}

function checkIfForecastForToday(singleForecastInterval) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const tomorrowMidnight = (getUnixTime(tomorrow));
    const singleForecastIntervalTimestamp = singleForecastInterval.dt;
    return singleForecastIntervalTimestamp < tomorrowMidnight

}

function createTodayForecastDiv(singleForecastInterval) {

    const todayIntervalPanel = document.createElement('div');
    todayIntervalPanel.id = 'aside--single-interval-panel';
    todayIntervalPanel.classList.add('aside', 'single-interval-panel');

    const todayIntervalPanelIcon = document.createElement('img');
    todayIntervalPanelIcon.src = (getIconSvgURL(conditionsIdIntoString(singleForecastInterval.weather[0].id)));

    const todayIntervalPanelTemp = document.createElement('p');
    todayIntervalPanelTemp.id = 'aside--single-interval-panel-temp';
    todayIntervalPanelTemp.classList.add('aside', 'single-interval-panel', 'temp');
    todayIntervalPanelTemp.innerText = stringIntoTemp(singleForecastInterval.main.temp)

    const todayIntervalPanelTime = document.createElement('p');
    todayIntervalPanelTime.id = 'aside--single-interval-panel-time';
    todayIntervalPanelTime.classList.add('aside', 'single-interval-panel', 'time');
    todayIntervalPanelTime.innerText = format(fromUnixTime(singleForecastInterval.dt), 'H:mm')

    todayIntervalPanel.append(todayIntervalPanelIcon, todayIntervalPanelTemp, todayIntervalPanelTime)
    return todayIntervalPanel

}

function createFiveDayForecastDiv(singleForecastInterval) {
    const fiveDayIntervalPanel = document.createElement('div');
    fiveDayIntervalPanel.id = 'aside--five-day-single-interval-panel';
    fiveDayIntervalPanel.classList.add('aside', 'five-day', 'single-interval-panel');

    const fiveDayIntervalPanelIcon = document.createElement('img');
    fiveDayIntervalPanelIcon.src = (getIconSvgURL(conditionsIdIntoString(singleForecastInterval.weather[0].id)));

    const fiveDayIntervalPanelTemp = document.createElement('p');
    fiveDayIntervalPanelTemp.id = 'aside--five-day-single-interval-panel-temp';
    fiveDayIntervalPanelTemp.classList.add('aside', 'five-day', 'single-interval-panel', 'temp');
    fiveDayIntervalPanelTemp.innerText = stringIntoTemp(singleForecastInterval.main.temp)

    const fiveDayIntervalPanelDate = document.createElement('p');
    fiveDayIntervalPanelDate.id = 'aside--five-day-single-interval-panel-date';
    fiveDayIntervalPanelDate.classList.add('aside', 'five-day', 'single-interval-panel', 'date');
    fiveDayIntervalPanelDate.innerText = format(fromUnixTime(singleForecastInterval.dt), 'eee, d LLL')

    fiveDayIntervalPanel.append(fiveDayIntervalPanelIcon, fiveDayIntervalPanelTemp, fiveDayIntervalPanelDate)
    return fiveDayIntervalPanel
}