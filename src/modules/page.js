//import different modules
import generateSidebar from './sidebar';

// check for local storage to read if user has a list of cities saved

export default function appGenerate() {
    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    (document.getElementById('content')).append(appWindow);
    appWindow.append(generateSidebar()); // not all functions are yet ready
}

// generate sidebar
// generate main
// generate weekSidePanel

// create a fucntion so setLocalStorage