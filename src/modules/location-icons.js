import clear from '../assets/location-icons/clear.svg'
import atmosphere from '../assets/location-icons/atmosphere.svg'
import clearNight from '../assets/location-icons/clear-night.svg'
import clouds from '../assets/location-icons/clouds.svg'
import drizzle from '../assets/location-icons/drizzle.svg'
import rain from '../assets/location-icons/rain.svg'
import snow from '../assets/location-icons/snow.svg'
import thunderstorm from '../assets/location-icons/thunderstorm.svg'

const images = { clear, atmosphere, clearNight, clouds, drizzle, rain, snow, thunderstorm }

export function getIconSvgURL(conditions) {
    var results = Object.keys(images).map((key) => [(key), images[key]]);
    var searchedURL = ''
    results.forEach(result => {
        if (result[0] === conditions) {
            searchedURL = result[1]
        }
    })
    return searchedURL
}