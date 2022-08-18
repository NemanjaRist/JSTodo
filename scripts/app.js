const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon  = document.querySelector('.icon img');

const updateUI = (data) => {
    /*
    const cityDets = data.cityDets;
    const weather = data.weather;
    */

    //Destructuring properties
    const { cityDets, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night/day & icon images
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc =   null;

    if(weather.IsDayTime){
        timeSrc = 'images/day.svg';
    }
    else{
        timeSrc = 'images/night.svg';
    }

    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,//object shorthand notation (when property name is the same as the value name)
        weather  //object shorthand notation                       -||-
    };

};

cityForm.addEventListener('submit',e => {
    //preventing default action
    e.preventDefault();


    //get city value
    const city = cityForm.city.value.trim();

    cityForm.reset();

    //Update UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});