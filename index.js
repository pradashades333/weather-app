const api = "TW3JTUUM3483ZAAWB3F73NX5V";
const gif_api = "KBFOsWeI76G1t9Be9deXVEuORXEu2968";
let currentWeather = null;

let celsius = false;

const form  = document.getElementById("form");
const input = document.getElementById("input");
const display = document.getElementById("display-weather");

async function getWeather(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const info = weatherData(data);
    console.log(info)

    return info;
}

async function getGif(conditions){
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${gif_api}&s=${conditions} weather`;

    const response = await fetch(url);
    const data = await response.json();

    return data.data.images.original.url;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const location = input.value;

    const weatherInfo = await getWeather(location);
    
    currentWeather = weatherInfo; 
    await showWeather(weatherInfo);

})


function weatherData(data){
    return {
        location: data.address,
        temp: data.currentConditions.temp,
        conditions: data.currentConditions.conditions,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed
    };
}


function fToC(F) {
    return ((F - 32) * 5/9).toFixed(1);
}

async function showWeather (weatherInfo){
    if (celsius){
        temp = fToC(weatherInfo.temp);
    } else {
        temp = weatherInfo.temp;
    }

    let unit;
    if (celsius) {
        unit = '°C';
    } else {
        unit = '°F';
    }

    const gifUrl = await getGif(weatherInfo.conditions);

    display.innerHTML = `
    <h2>${weatherInfo.location}</h2>
    <img src="${gifUrl}" alt="${weatherInfo.conditions}" width="300">
    <p>temperature: ${temp}${unit}</p>
    <p>conditions: ${weatherInfo.conditions}</p>
    <p>humidty: ${weatherInfo.humidity}%</p>
    <p>wind speed: ${weatherInfo.windSpeed} mph</p>
    `;
} 



const measurement = document.getElementById('measurement')

measurement.addEventListener('click', async () =>{
    celsius = !celsius

    if (celsius) {
        measurement.textContent = 'change to °F';
    } else {
        measurement.textContent = 'change to °C';
    }
    
    if (currentWeather) {
        await showWeather(currentWeather);
    }
})

