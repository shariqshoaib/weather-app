import React from 'react'
import CityWeather from './CityWeather';
import ForecastChart from './ForecastChart'



const Weather = (props) => {
    const { chartData, tempChartHandler, percipitationChartHandler } = props;
    const { cityData, currentData } = props.data;
    
    if(props.data.cityData === undefined) return <div></div>;

    return (
        <div className='weather'>
            <CityWeather
                cityData={ cityData }
                currentData={ currentData }
            />
            
            <div className="btn-group">
                <button onClick={() => tempChartHandler()}>Temperature</button>
                <button onClick={() => percipitationChartHandler()}>Precipitation</button>
            </div>
            <ForecastChart 
                data={ chartData.data }
            />
      </div>
    );
}

export default Weather;


