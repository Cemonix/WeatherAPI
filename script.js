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

    ProcessWeather(data);
}

function ProcessWeather(data){
    for(let i = 0; i < 2; i++){
        container.children[0].children[i].style.visibility = "visible";
    }
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

