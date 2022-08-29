import { regenerateListOfLocations } from './sideNavbar'
import { displayForecastForSelectedLocation } from "./mainSection";


export var listOfSavedLocations = [];

export class Location {
    constructor(city, lon, lat) {
        this.city = city;
        this.lon = lon;
        this.lat = lat;
        this.currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=9f876f750cae75b9e377c00b71db4a27`
        listOfSavedLocations.push(this)
    }
}

export function checkIfCityAlreadySaved(newCityName) {
    if (listOfSavedLocations.some(location => location.city === newCityName)) {
        return true
    } else {
        return false
    }
}

async function addBytom() {
    return new Location('bytom', 18.9231857, 50.3470387)
}

(async function firstLocation() {
    const bytomLocation = await addBytom()
    regenerateListOfLocations()
    displayForecastForSelectedLocation(bytomLocation)
})();
