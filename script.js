const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "bf709b27e15bbfcd75c40af8cf106198"
  }
const input = document.querySelector('.input');

input.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        fetchUsers(input.value);
        input.value = '';
    }
}
async function fetchUsers(city){
    const res = await fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);

    const dataJson = await res.json();
    
} 
