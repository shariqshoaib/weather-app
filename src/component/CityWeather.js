import React from 'react'
import { getIconUrl } from './Helper';

export const CityWeather = (props) => {
    const {cityData, currentData} = props;
    
    if(cityData && currentData === undefined) return <div></div>;
    console.log('Weather Data ',cityData, currentData);
   
    
    return (
        <div className='row'>
            <CityTemperature
                currentData={currentData}
            />
            <CityWeatherDetails 
                currentData={currentData}
            />
            <CityDetails 
                cityData={cityData}
                currentData={currentData}
            />
      </div>
    );
}

export default CityWeather;

const CityTemperature = ({currentData}) => {
    const {Temperature, WeatherIcon} = currentData;
    const {Metric} = Temperature;
    const {Value, Unit} = Metric;
    const iconUrl = getIconUrl(WeatherIcon);
    return (
        <div className='city-weather'>
            <img src={iconUrl} alt='Icon' width='100px' height='80'/> 
            <div>
                <b>{Value} <sup>{Unit}</sup></b>
            </div> 
        </div>
    )
}

const CityWeatherDetails = ({currentData}) =>{
    const {PrecipitationType, Wind, RelativeHumidity} = currentData;
    const {Speed} = Wind;
    const {Metric} = Speed;
    const {Value, Unit} = Metric;
    return (
        <div className='city-details row'>
            <div>
                <h3>Precipitation</h3>
                {PrecipitationType ? PrecipitationType : 'None'}
            </div>
            <div>
                <h3>Wind Speed</h3>
                {`${Value} ${Unit}`}
            </div>
            <div>
                <h3>Humidity</h3>
                {RelativeHumidity}
            </div>
        </div>
        
    )
}

const CityDetails = ({cityData, currentData}) => {
    const {LocalizedName} = cityData;
    const {WeatherText, EpochTime} = currentData;
    const currentDate = new Date(EpochTime * 1000);
    
    return (
        <div>
            <h2>{LocalizedName}</h2>
            <p>{WeatherText}</p>
            {currentDate.toLocaleDateString()}
        </div>
    )
}