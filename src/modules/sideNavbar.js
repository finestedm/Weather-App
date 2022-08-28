import { Location, listOfSavedLocations } from "./savedLocations";

export default function generateSideNavbar() {

    const sideNavbar = document.createElement('nav');
    sideNavbar.classList.add('sidenavbar');
    sideNavbar.id = 'sidenavbar';
    sideNavbar.append(createLocationSearchBar())

    return sideNavbar;
}

function createLocationSearchBar() {
    const LocationSearchBar = document.createElement('input');
    LocationSearchBar.type = 'text';
    LocationSearchBar.name = 'search-location';
    LocationSearchBar.id = 'location-search-bar';
    LocationSearchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showProposedLocationsWindows(LocationSearchBar.value)
        }
    })
    createSuggestedLocationDropdown()

    return LocationSearchBar;
}

function createSuggestedLocationDropdown() {
    const suggestedLocationDatalist = document.createElement('ul');
    suggestedLocationDatalist.id = 'location-chooser-dropdown';
    document.getElementById('content').append(suggestedLocationDatalist)
}

async function showProposedLocationsWindows(searchedLocation) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedLocation}&lang=pl&limit=5&appid=9f876f750cae75b9e377c00b71db4a27`, { mode: 'cors' });
    const responseJson = await response.json();
    showLocationChooserDropdown(responseJson)
}

function showLocationChooserDropdown(listOfSuggestedLocations) {
    const locationChooserDropdown = document.getElementById('location-chooser-dropdown');
    if (listOfSuggestedLocations !== null) {
        listOfSuggestedLocations.forEach(location => {
            const locationOption = document.createElement('li');
            locationOption.innerText = `${location.name} in ${location.state}, ${location.lat}/${location.lon}`;
            locationOption.addEventListener('click', () => {
                const locationObject = new Location(location.name, location.lat, location.lon)
                showLocationChooserDropdown(null);
                document.getElementById('location-search-bar').value = ''
                // showListOfLocation();
                fetchCurrentWeatherData(locationObject)
            })
            locationChooserDropdown.append(locationOption);
        })
    } else {        // find a better way to clear the locationChooserDropdown
        locationChooserDropdown.remove()
        createSuggestedLocationDropdown()
    }
}

// function showListOfLocation() {
//     const listOfLocation = document.createElement('ul');
//     listOfSavedLocations.forEach(location => {
//         const locationDiv = document.createElement('li');
//         locationDiv.innerText = location.city;
//         listOfLocation.append(locationDiv);
//     })
//     document.getElementById('content').append(listOfLocation)
// }

async function fetchCurrentWeatherData(locationObject) {
    const response = await fetch(`${locationObject.currentWeatherURL}`, { mode: 'cors' });
    const responseJson = await response.json();
    console.log(responseJson)
    //append that data to elements in main
}