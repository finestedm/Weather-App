import { Location, listOfSavedLocations, checkIfCityAlreadySaved } from "./savedLocations";

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
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedLocation}&lang=pl&limit=5&appid=9f876f750cae75b9e377c00b71db4a27`, { mode: 'cors' });
        const responseJson = await response.json();
        showLocationChooserDropdown(responseJson)
    } catch (error) {
        console.log(error);
    }
}

function showLocationChooserDropdown(listOfSuggestedLocations) {
    const locationChooserDropdown = document.getElementById('location-chooser-dropdown');
    if (listOfSuggestedLocations.length === 0) {
        locationChooserDropdown.append(createLocationEmptyNotification());
        setTimeout(() => {
            locationChooserDropdown.innerHTML = '';
        }, 3000);
    } else if (locationChooserDropdown === 'empty') {
        locationChooserDropdown.innerHTML = '';
    } else {
        locationChooserDropdown.innerHTML = '';
        listOfSuggestedLocations.forEach(location => {
            locationChooserDropdown.append(createLocationOptionElement(location));
        })
    }
}

function createLocationEmptyNotification() {
    const locationOption = document.createElement('li');
    locationOption.innerText = `No city with this name found.`;
    return locationOption;
}

function createLocationOptionElement(location) {
    const locationOption = document.createElement('li');
    locationOption.innerText = `${location.name} in ${location.state}, lat: ${location.lat}, lon: ${location.lon}`;
    locationOption.addEventListener('click', async () => {
        if (checkIfCityAlreadySaved(location.name)) {
            console.log('city already added')
        } else {
            const locationObject = new Location(location.name, location.lat, location.lon);
            await fetchCurrentWeatherData(locationObject);
            document.getElementById('location-search-bar').value = '';
            document.getElementById('location-chooser-dropdown').innerHTML = '';  // empties the suggested location list
        }
    })
    return locationOption;
}

async function fetchCurrentWeatherData(locationObject) {
    const response = await fetch(`${locationObject.currentWeatherURL}`, { mode: 'cors' });
    const responseJson = await response.json();
    console.log(responseJson)
    //append that data to elements in main
}