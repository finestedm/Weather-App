import { Location, listOfSavedLocations, checkIfCityAlreadySaved } from "./savedLocations";
import { displayForecastForSelectedLocation } from "./mainSection";

export default function generateSideNavbar() {

    const sideNavbar = document.createElement('nav');
    sideNavbar.classList.add('sidenavbar');
    sideNavbar.id = 'sidenavbar';
    sideNavbar.append(createLocationSearchBar(), displaySavedLocations())
    return sideNavbar;
}

function createLocationSearchBar() {
    const locationSearchBarWrapper = document.createElement('div')
    locationSearchBarWrapper.id = 'location-search-bar-wrapper';
    const LocationSearchBar = document.createElement('input');
    LocationSearchBar.type = 'text';
    LocationSearchBar.name = 'search-location';
    LocationSearchBar.id = 'location-search-bar';
    LocationSearchBar.placeholder = 'Search city...';
    LocationSearchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showProposedLocationsWindows(LocationSearchBar.value)
        }
    });
    setTimeout(() => {
        createSuggestedLocationDropdown()
    }, 0);

    locationSearchBarWrapper.append(LocationSearchBar)
    return locationSearchBarWrapper;
}

function createSuggestedLocationDropdown() {
    const suggestedLocationDatalist = document.createElement('ul');
    suggestedLocationDatalist.style.visibility = 'hidden'
    suggestedLocationDatalist.id = 'location-chooser-dropdown';
    document.getElementById('location-search-bar-wrapper').append(suggestedLocationDatalist);
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
    const searchBar = document.getElementById('location-search-bar');
    locationChooserDropdown.innerHTML = '';
    locationChooserDropdown.style.visibility = 'visible'
    if (listOfSuggestedLocations.length === 0) {
        locationChooserDropdown.append(createLocationEmptyNotification());
        searchBar.setCustomValidity('No such city found');
        searchBar.addEventListener('keydown', () => {
            locationChooserDropdown.innerHTML = '';
            searchBar.setCustomValidity('');
            locationChooserDropdown.style.visibility = 'hidden'
        })
    } else {
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
    const searchBar = document.getElementById('location-search-bar');
    const locationChooserDropdown = document.getElementById('location-chooser-dropdown');
    const locationOption = document.createElement('li');
    locationOption.innerHTML = `${location.name} <br> <small> ${location.state} </small>`;
    locationOption.addEventListener('click', () => {
        if (checkIfCityAlreadySaved(location.name)) {
            searchBar.setCustomValidity('This city is already in saved locations list');
            searchBar.addEventListener('keydown', () => {
                locationChooserDropdown.innerHTML = '';
                locationChooserDropdown.style.visibility = 'hidden'
                searchBar.setCustomValidity('');
            })
        } else {
            new Location(location.name, location.lon, location.lat);
            searchBar.value = '';
            locationChooserDropdown.innerHTML = '';  // empties the suggested location list
            locationChooserDropdown.style.visibility = 'hidden'
            regenerateListOfLocations()
        }
    })
    return locationOption;
}

function displaySavedLocations() {
    const listOfSavedLocationsDivHolder = document.createElement('div');
    listOfSavedLocationsDivHolder.innerHTML = "<h2>Saved locations</h2>"
    listOfSavedLocationsDivHolder.id = 'list-of-saved-locations-holder'
    return listOfSavedLocationsDivHolder
}

export function regenerateListOfLocations() {
    try {
        document.getElementById('list-of-saved-locations').remove();
    } catch {
        { }
    }
    const listOfSavedLocationsDivHolder = document.getElementById('list-of-saved-locations-holder');
    const listOfSavedLocationsDiv = document.createElement('ul');
    listOfSavedLocationsDiv.id = 'list-of-saved-locations';
    try {
        listOfSavedLocations.forEach(location => {
            const locationButton = document.createElement('li');
            locationButton.innerText = location.city;
            locationButton.addEventListener('click', () => displayForecastForSelectedLocation(location))
            listOfSavedLocationsDiv.append(locationButton);
        })
    } catch { { } }
    listOfSavedLocationsDivHolder.append(listOfSavedLocationsDiv)
}


