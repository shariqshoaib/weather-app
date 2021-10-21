import {Chart} from 'chart.js/auto'

export const getCityData = async (cityName) => {
    const apiKey = 'apikey=TMbeIiQWLVDXoogprT9TQPr46u4pMR8R';
    
    const cityDataUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?${apiKey}&q=${cityName}`;
    const [cityData] = await fetchData(cityDataUrl);
    const {Key} = cityData;

    const currentDataUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?${apiKey}&details=true`;
    const [currentData] = await fetchData(currentDataUrl);

    const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${Key}?${apiKey}&details=true&metric=true`;
    const forecastData = await fetchData(forecastUrl);

   return {cityData, currentData, forecastData};
}

export function getIconUrl(iconNum){
    return (iconNum.toString().length < 2)
      ? 'https://developer.accuweather.com/sites/default/files/0'+iconNum+'-s.png'
      : 'https://developer.accuweather.com/sites/default/files/'+iconNum+'-s.png' 
}

export function getHours(cityForecast){
    let value = []

    cityForecast.forEach((hour)=>{
      const {EpochDateTime} = hour;
      const converted = epochIntoHour(EpochDateTime);
      value = [...value, converted];
    })

    console.log('hours', value);
    return value;
  }

function epochIntoHour(EpochDateTime){

    const date = new Date(EpochDateTime * 1000);
    const hour = date.getHours();

    if(hour === 0){
      return 12 + ' am'
    }
    if(hour <= 12){
      return hour + ' am'
    }
    else{
      return hour - 12  + ' pm';
    }
}

async function fetchData(url){
    const data = await fetch(url).then(response => response.json());
    return data;
}

export function getForecastData(forecastData){
  const hours = getHours(forecastData);;
  let temperatures = [];
  let precipitations = [];
  forecastData.forEach((hour)=>{
      const {Temperature, PrecipitationProbability} = hour;
      const {Value} = Temperature;
      temperatures.push(Value);
      precipitations.push(PrecipitationProbability);
  })
  console.log ({hours, temperatures, precipitations})
  

  return {hours, temperatures, precipitations}
}

export function getNewConfig(newLabels, newData, label){

  const data = {
    labels: newLabels,
    datasets: [
      {
        data: newData,
        label: label,
      }
    ]
  };

  return {data};

}