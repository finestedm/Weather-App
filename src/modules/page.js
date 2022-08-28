import generateSideNavbar from './sideNavbar';
import generateMainSection from './mainSection';
import generateSideWeekForecastSection from './sideSection';

// check for local storage to read if user has a list of cities saved

export default function appGenerate() {
    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    (document.getElementById('content')).append(appWindow);
    appWindow.append(generateSideNavbar(), generateMainSection(), generateSideWeekForecastSection()); // not all functions are yet ready
}

// create a function so setLocalStorage