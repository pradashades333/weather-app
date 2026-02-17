const api = "TW3JTUUM3483ZAAWB3F73NX5V";

const form  = document.getElementById("form");
const input = document.getElementById("input");
const display = document.getElementById("display-weather");

async function getWeather(location) {
    const url = '`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api}`;'
    
    const response = await fetch(url)
    const data = await response.json()


}