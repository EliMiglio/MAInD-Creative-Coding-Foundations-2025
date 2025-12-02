const CONTAINER = document.getElementById ('container')

const API_KEY = '80d1993378fa9e47ffc9c7fec53fe1d2'
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=45.9&lon=8.96&units=metric&appid=' + API_KEY

fetch(API_URL)
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError(error));


function displayData(data){
    console.log(data)

    const FORECAST = data.list;
    console.log(FORECAST)

    for (let item of FORECAST){
        const DATE_TIME = item.dt_txt;
        const DATE = DATE_TIME.substring(0,10)
        const TIME = DATE_TIME.substring(11,13)
        const TEMP = item.main.temp;
        
        const listItem = document.getElementById (

    }
}

for (let item of weather Data){

    const temperature = item.main.temp;
    const tempFix = (temperature + 2) * 20;

    const time = item.dt_txt.substring (0, 16);

    const listItem = document.createElement ('li');
    listItem.textContent = `$(time): $(temperature)°`;

    let bgColor = 'gray';
    //if (temperature <= 0){
       // bgColor = 'blue'//
    }
            const tempBar = document.createElement ('div');
        tempBar.classList.add ('bar');
        tempBar.style.width = `${'tempFix'}px`;
        tempBar.style.backgroundColor = bgColor;
        
        listItem.appendChild(tempBar);
        CONTAINER.appendChild(listItem);
        }
        const tempBar = document.createElement ('div');
        tempBar.classList.add ('bar');
        tempBar.style.width = `${'tempFix'}px`;
        tempBar.style.backgroundColor = bgColor;
        
        listItem.appendChild(tempBar);
        CONTAINER.appendChild(listItem);



        function displayError(error){
            console.log(error)
} 

function tempToHSL(temp, minTemp = -5, maxTemp = 50){
    temp = Math.max(minTemp, Math.min(maxTemp,Temp))
    const hue = ((maxTemp - temp) / (maxTemp - minTemp)) * 240;

    return `hs<${hue}, 80%, 50%`;

}