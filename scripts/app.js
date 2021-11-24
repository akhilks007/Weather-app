const cityform = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeimg = document.querySelector('.time');
const icon = document.querySelector('.icon img');

//Updating the details on UI
const updateui = (data) => {
    // const citydetails = data.citydetails;
    // const weatherdetails = data.weatherdetails;
    
    //destructure properties
    const {citydetails,weatherdetails} = data; //This will do exactly the same as the code commented before this

    console.log(weatherdetails);

    //updating the values on html elements using a template string
    details.innerHTML = `
        <h5 class="my-3">${citydetails.EnglishName}</h5>
        <div class="my-3">${weatherdetails.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherdetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const timesrc = weatherdetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';//ternary operator for setting the source of day/night image
    timeimg.setAttribute('src', timesrc);

    const iconsrc = `img/icons/${weatherdetails.WeatherIcon}.svg`;//setting source of icon
    icon.setAttribute('src', iconsrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

//getting weather city details from function in forecast.js
const updatecity = async (city) => {
    const citydetails = await getcity(city);
    const weatherdetails = await getweather(citydetails.Key);

    return {citydetails,weatherdetails};//object shorthand notation
};

//Submit event listener for the city form
cityform.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityform.city.value.trim();
    cityform.reset();
    updatecity(city)
        .then((data) => {
            updateui(data);
        }).catch((err) => {
            console.log(err);
        });
});