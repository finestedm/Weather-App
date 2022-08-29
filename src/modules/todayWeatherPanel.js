export default function createTodayWeatherPanel(weatherData) {
    const todayWeatherPanel = document.createElement('section')
    todayWeatherPanel.id = 'today-weather-panel';
    todayWeatherPanel.classList.add('main', 'today', 'weather-panel')

    const todayTemp = document.createElement('h2');
    todayTemp.id = 'today-weather-temp';
    todayTemp.classList.add('main', 'today', 'weather-panel', 'temp')
    todayTemp.innerText = roundTemp(weatherData.main.temp);

    const todayDescription = document.createElement('h3');
    todayDescription.id = 'today-weather-description';
    todayDescription.classList.add('main', 'today', 'weather-panel', 'description')
    todayDescription.innerText = weatherData.weather[0].description;

    console.log(weatherData)

    todayWeatherPanel.append(todayTemp, todayDescription);
    return todayWeatherPanel;
}


function roundTemp(temp) {
    return Math.round(temp)
}