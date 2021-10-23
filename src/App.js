import React, { useState, createRef} from "react";
import { getCityData, getForecastData, getNewConfig } from "./component/Helper";
import Search from "./component/Search";
import Weather from "./component/Weather";
import './App.css';

const App = () => {

  const [data, setData] = useState({});
  const [chartData, setChartData] = useState({});
  const [config, setConfig] = useState({});
  const searchInputRef = createRef();

  const setCityData = async () =>{
    const searchName = searchInputRef.current.value;
    const data = await getCityData(searchName);
    const chartData = getForecastData(data.forecastData);
    const config = getNewConfig(chartData.hours, chartData.temperatures, 'Temperatures Forecast')

    setData(data)
    setChartData(chartData)
    setConfig(config)
  }

  const setTempChart = () => {
    const newConfig = getNewConfig(chartData.hours, chartData.temperatures, 'Temperatures Forecast');
    setConfig(newConfig)
  }

  const setPrecipitationChart = () => {
    const newConfig = getNewConfig(chartData.hours, chartData.precipitations, 'Precipitations Probability');
    setConfig(newConfig)
  }
  
  return (
    <div >
      <Search 
        searchRef = {searchInputRef}
        onSearchHandler={setCityData}
      >
      </Search>
      <Weather 
        data={data}
        chartData={config}
        tempChartHandler = {setTempChart}
        percipitationChartHandler = {setPrecipitationChart}
      />
    </div>
  );
}

export default App;
