const userTab= document.querySelector("[data-userweather]");
const searchtab= document.querySelector("[data-searchweather]");
const usercontainer= document.querySelector(".weather-container");

const grantaccesscontainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchforms]");
const loadingscreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;

const API_KEY="845a94cdb6c346b1997182631242102";
currentTab.classList.add("current-tab");
grantaccesscontainer.classList.add("active");

function switchtab(clickedtab)
{
    if(currentTab != clickedtab)
    {
        currentTab.classList.remove("current-tab");
        currentTab=clickedtab;
        currentTab.classList.add("current-tab");
    
    if(!searchForm.classList.contains("active"))
    {
        userInfoContainer.classList.remove("active");
        grantaccesscontainer.classList.remove("active");
        searchForm.classList.add("active");

    }
    else
    {
        userInfoContainer.classList.add("active");
        grantaccesscontainer.classList.add("active");
        searchForm.classList.remove("active");
        getfromsessionStorage();
        
    }
    
    
    }
}

userTab.addEventListener("click",()=>
{switchtab(userTab);}
);
searchtab.addEventListener("click",()=>
{switchtab(searchtab);}
);

function getfromsessionStorage()
{
    const localcord = sessionStorage.getItem("user-coordinates");
    console.log("session storage called");

    if(!localcord)
    {
        grantaccesscontainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localcord);
        fetchUserWeatherinfowithcoordiantes(coordinates);
    }

}
async function fetchUserWeatherinfowithcoordiantes(coordinates)
{
    const {lat,lon} = coordinates;
    console.log(" fetch function for coordinates working ");
    grantaccesscontainer.classList.remove("active");
    loadingscreen.classList.add("active");
    console.log(coordinates);


    try
    { const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=yes`);
        
      console.log("API called for location",lat,lon);   
    
      const data =await response.json();
      console.log(data);
      loadingscreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderweatherinfo(data);
    }
    catch(err)
    {
        loadingscreen.classList.remove("active");
        displayerror();
    }

}
function displayerror()
{
    const weathericon= document.querySelector("[data-weathericon]");
    const cityname = document.querySelector("[data-cityname]");
    weathericon.src='./assets/not-found.png'
    cityname.innerText=" City not Found "
    const countryicon= document.querySelector("[data-countryicon]");
    countryicon.style.display='none';
    const pmcontainer = document.querySelector(".parameter-container")
    pmcontainer.style.display='none';
    const desc= document.querySelector("[data-weatherdesc]");
    const temp= document.querySelector("[data-temp]");
    desc.innerText = "";
    temp.innerText = "";


}

function renderweatherinfo(weatherinfo)
{
    const cityname = document.querySelector("[data-cityname]");
    const countryicon= document.querySelector("[data-countryicon]");
    const desc= document.querySelector("[data-weatherdesc]");
    const weathericon= document.querySelector("[data-weathericon]");
    const temp= document.querySelector("[data-temp]");
    const windspeed= document.querySelector("[data-windspeed]");
    const humidity= document.querySelector("[data-humidity]");
    const cloudiness= document.querySelector("[data-cloud]");
    
    cityname.innerText = weatherinfo?.location?.name;
    desc.innerText = weatherinfo?.current?.condition?.text;
    weathericon.src = weatherinfo?.current?.condition?.icon;
    temp.innerText =  `${weatherinfo?.current?.temp_c}°C`;
    windspeed.innerText = `${weatherinfo?.current?.wind_kph} KM/H`;
    humidity.innerText = `${weatherinfo?.current?.humidity} %`;
    cloudiness.innerText = `${weatherinfo?.current?.cloud} %`;
    
    
    let countryname = weatherinfo?.location?.country;
    const countryMapping = {
        "Afghanistan": "AF",
        "Albania": "AL",
        "Algeria": "DZ",
        "Andorra": "AD",
        "Angola": "AO",
        "Antigua and Barbuda": "AG",
        "Argentina": "AR",
        "Armenia": "AM",
        "Australia": "AU",
        "Austria": "AT",
        "Azerbaijan": "AZ",
        "Bahamas": "BS",
        "Bahrain": "BH",
        "Bangladesh": "BD",
        "Barbados": "BB",
        "Belarus": "BY",
        "Belgium": "BE",
        "Belize": "BZ",
        "Benin": "BJ",
        "Bhutan": "BT",
        "Bolivia": "BO",
        "Bosnia and Herzegovina": "BA",
        "Botswana": "BW",
        "Brazil": "BR",
        "Brunei": "BN",
        "Bulgaria": "BG",
        "Burkina Faso": "BF",
        "Burundi": "BI",
        "Cabo Verde": "CV",
        "Cambodia": "KH",
        "Cameroon": "CM",
        "Canada": "CA",
        "Central African Republic": "CF",
        "Chad": "TD",
        "Chile": "CL",
        "China": "CN",
        "Colombia": "CO",
        "Comoros": "KM",
        "Congo (Congo-Brazzaville)": "CG",
        "Costa Rica": "CR",
        "Croatia": "HR",
        "Cuba": "CU",
        "Cyprus": "CY",
        "Czechia (Czech Republic)": "CZ",
        "Democratic Republic of the Congo": "CD",
        "Denmark": "DK",
        "Djibouti": "DJ",
        "Dominica": "DM",
        "Dominican Republic": "DO",
        "Ecuador": "EC",
        "Egypt": "EG",
        "El Salvador": "SV",
        "Equatorial Guinea": "GQ",
        "Eritrea": "ER",
        "Estonia": "EE",
        "Eswatini (fmr. 'Swaziland')": "SZ",
        "Ethiopia": "ET",
        "Fiji": "FJ",
        "Finland": "FI",
        "France": "FR",
        "Gabon": "GA",
        "Gambia": "GM",
        "Georgia": "GE",
        "Germany": "DE",
        "Ghana": "GH",
        "Greece": "GR",
        "Grenada": "GD",
        "Guatemala": "GT",
        "Guinea": "GN",
        "Guinea-Bissau": "GW",
        "Guyana": "GY",
        "Haiti": "HT",
        "Holy See": "VA",
        "Honduras": "HN",
        "Hungary": "HU",
        "Iceland": "IS",
        "India": "IN",
        "Indonesia": "ID",
        "Iran": "IR",
        "Iraq": "IQ",
        "Ireland": "IE",
        "Israel": "IL",
        "Italy": "IT",
        "Jamaica": "JM",
        "Japan": "JP",
        "Jordan": "JO",
        "Kazakhstan": "KZ",
        "Kenya": "KE",
        "Kiribati": "KI",
        "Kuwait": "KW",
        "Kyrgyzstan": "KG",
        "Laos": "LA",
        "Latvia": "LV",
        "Lebanon": "LB",
        "Lesotho": "LS",
        "Liberia": "LR",
        "Libya": "LY",
        "Liechtenstein": "LI",
        "Lithuania": "LT",
        "Luxembourg": "LU",
        "Madagascar": "MG",
        "Malawi": "MW",
        "Malaysia": "MY",
        "Maldives": "MV",
        "Mali": "ML",
        "Malta": "MT",
        "Marshall Islands": "MH",
        "Mauritania": "MR",
        "Mauritius": "MU",
        "Mexico": "MX",
        "Micronesia": "FM",
        "Moldova": "MD",
        "Monaco": "MC",
        "Mongolia": "MN",
        "Montenegro": "ME",
        "Morocco": "MA",
        "Mozambique": "MZ",
        "Myanmar (formerly Burma)": "MM",
        "Namibia": "NA",
        "Nauru": "NR",
        "Nepal": "NP",
        "Netherlands": "NL",
        "New Zealand": "NZ",
        "Nicaragua": "NI",
        "Niger": "NE",
        "Nigeria": "NG",
        "North Korea": "KP",
        "North Macedonia": "MK",
        "Norway": "NO",
        "Oman": "OM",
        "Pakistan": "PK",
        "Palau": "PW",
        "Palestine State": "PS",
        "Panama": "PA",
        "Papua New Guinea": "PG",
        "Paraguay": "PY",
        "Peru": "PE",
        "Philippines": "PH",
        "Poland": "PL",
        "Portugal": "PT",
        "Qatar": "QA",
        "Romania": "RO",
        "Russia": "RU",
        "Rwanda": "RW",
        "Saint Kitts and Nevis": "KN",
        "Saint Lucia": "LC",
        "Saint Vincent and the Grenadines": "VC",
        "Samoa": "WS",
        "San Marino": "SM",
        "Sao Tome and Principe": "ST",
        "Saudi Arabia": "SA",
        "Senegal": "SN",
        "Serbia": "RS",
        "Seychelles": "SC",
        "Sierra Leone": "SL",
        "Singapore": "SG",
        "Slovakia": "SK",
        "Slovenia": "SI",
        "Solomon Islands": "SB",
        "Somalia": "SO",
        "South Africa": "ZA",
        "South Korea": "KR",
        "South Sudan": "SS",
        "Spain": "ES",
        "Sri Lanka": "LK",
        "Sudan": "SD",
        "Suriname": "SR",
        "Sweden": "SE",
        "Switzerland": "CH",
        "Syria": "SY",
        "Tajikistan": "TJ",
        "Tanzania": "TZ",
        "Thailand": "TH",
        "Timor-Leste": "TL",
        "Togo": "TG",
        "Tonga": "TO",
        "Trinidad and Tobago": "TT",
        "Tunisia": "TN",
        "Turkey": "TR",
        "Turkmenistan": "TM",
        "Tuvalu": "TV",
        "Uganda": "UG",
        "Ukraine": "UA",
        "United Arab Emirates": "AE",
        "United Kingdom": "GB",
        "United States of America": "US",
        "Uruguay": "UY",
        "Uzbekistan": "UZ",
        "Vanuatu": "VU",
        "Venezuela": "VE",
        "Vietnam": "VN",
        "Yemen": "YE",
        "Zambia": "ZM",
        "Zimbabwe": "ZW"
      };
    countryicon.src = `https://flagcdn.com/144x108/${countryMapping[countryname].toLowerCase()}.png`;

}

function getlocation()
{
    navigator.geolocation.getCurrentPosition(showPosition, (error) => {
        console.log(error.message);
      });
    
}


function showPosition(position)
{
    const userCoordinates =
    {
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    console.log(userCoordinates);

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherinfowithcoordiantes(userCoordinates);

}

const grantaccessbutton = document.querySelector("[data-grant-acess]");
grantaccessbutton.addEventListener("click",getlocation);

const searchinput = document.querySelector("[data-searchinput]");

searchForm.addEventListener("submit",(e)=>
{
    e.preventDefault();
    let cityname = searchinput.value;

    if(cityname==="")
        return;
    else
        fetchUserWeatherinfo(cityname);


});

async function fetchUserWeatherinfo(city)
{   console.log("fetch fucntion for city working");
    loadingscreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantaccesscontainer.classList.remove("active");
    
    try
    {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
    
        const data =await response.json();
        loadingscreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderweatherinfo(data);

    }
    catch(err)
    {
        loadingscreen.classList.remove("active");
        displayerror();
        

    }
}

