const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "bf709b27e15bbfcd75c40af8cf106198"
  }
const input = document.querySelector('.input');
const section = document.querySelector('.section');
const container = document.querySelector('.container');

input.addEventListener('keypress', SetQuery);

function SetQuery(evt) {
    if (evt.keyCode == 13) {
        FetchFunction(input.value);
        input.value = '';
    }
}
async function FetchFunction(city){
    const res = await fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);

    const dataJson = await res.json();
    
    ProcessData(dataJson);
} 

function ProcessData(data){
    section.children[0].textContent = data.name;
    section.children[1].textContent = data.sys.country;
    section.children[2].textContent = `Longitude: ${data.coord.lon}° / Latitude: ${data.coord.lat}°`;

    container.style.visibility = "visible";
    section.style.visibility = "visible";

    ProcessWeather(data);
    ProcessFourBox(data);
    ProcessSunRiseSet(data);
}


function ProcessFourBox(data){
    container.children[1].children[0].textContent = 'Pressure:';
    container.children[1].children[1].textContent = data.main.pressure + ' Pa';

    container.children[2].children[0].textContent = 'Wind:';
    container.children[2].children[1].textContent = data.wind.speed + ' Km/h';

    container.children[3].children[0].textContent = 'Temp:';
    container.children[3].children[1].textContent = data.main.temp + ' °C';

    container.children[4].children[0].textContent = 'Humidity:';
    container.children[4].children[1].textContent = data.main.humidity + ' %';
}

function ProcessSunRiseSet(data){
    //to miliseconds
    let sunrise = UnixToDaytime(new Date(data.sys.sunrise * 1000));
    let sunset = UnixToDaytime(new Date(data.sys.sunset * 1000));
                    
    container.children[5].children[0].textContent = 'Sunrise:';
    container.children[5].children[1].textContent = sunrise;
    container.children[5].children[2].textContent = 'Sunset:';
    container.children[5].children[3].textContent = sunset;
                
}

function UnixToDaytime(unixTime){
    let hours = unixTime.getHours();
    let minutes = "0" + unixTime.getMinutes();
    let seconds = "0" + unixTime.getSeconds();

    return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}

function ProcessWeather(data){
    let typeOfWeather = data.weather[0];
    container.children[0].children[0].textContent = typeOfWeather.description[0].toUpperCase() + typeOfWeather.description.slice(1);
    PicturePicker(typeOfWeather.main)
}

function PicturePicker(typeOfWeather){
    switch(typeOfWeather){
        case "Clear":
            container.children[0].children[1].src = "pictures/sun.png"
            break;
        case "Clouds":
            container.children[0].children[1].src = "pictures/cloudy.png"
            break;
        case "Drizzle", "Rain":
            container.children[0].children[1].src = "pictures/rain.png"
            break;
        case "Thunderstorm":
            container.children[0].children[1].src = "pictures/thunderstorm.png"
            break;
        case "Snow":
            container.children[0].children[1].src = "pictures/snow.png"
            break;
        case "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Tornado", "Squall":
            container.children[0].children[1].src = "pictures/fog.png"
            break;
    }
}

