//   https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const form = document.querySelector('.weather-form')
const wrongSearch = document.querySelector('.wrong-search')
const place = document.querySelector('#placeName');
const country = document.querySelector('#country');
const tempPlace = document.querySelector('#temp');
const cloudyPerc = document.querySelector('.cloudy-percentage');
const km = document.querySelector('.visibility-km');
const humidityPerc = document.querySelector('.humidity-percentage');
const skyCond = document.querySelector('.sky-cond')
const icon = document.querySelector('#weather-icon');
let q;

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    q = form.elements.q.value;
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=43fa428d49a78ca28f337d942d08ccc9`)
        .then((finalData)=>{
            placeName.innerText = q.toUpperCase();
            let imageData = finalData.data.weather[0].icon;
            let source = "https://openweathermap.org/img/wn/"+imageData+".png";
            icon.style.backgroundImage = `url(${source})`;
            country.innerText = finalData.data.sys.country;
            country.style.color = "red";
            temperature = finalData.data.main.temp-273.15;
            let finalTemp = Math.round(temperature);
            temp.innerText = finalTemp;
            skyCond.innerText = finalData.data.weather[0].main;
            cloudyPerc.innerText = finalData.data.clouds.all;
            km.innerText = finalData.data.visibility/1000;
            humidityPerc.innerText = finalData.data.main.humidity;
            wrongSearch.style.display = "none";
            form.elements.q.value = "";
            
    })
        .catch((error) => {
            wrongSearch.style.display = "block";
            form.elements.q.value = "";
        })
})
