import React, {Component, createRef} from "react";
import { getCityData, getForecastData, getNewConfig } from "./component/Helper";
import Search from "./component/Search";
import Weather from "./component/Weather";
import ForecastChart from "./component/ForecastChart";
import './App.css';


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:{},
      chartData:{
        
      },
    }
    this.searchInputRef = createRef();
    this.chartCanavsRef = createRef();
  }

  async componentDidMount(){
  }

  setCityData = async () =>{
    const searchName = this.searchInputRef.current.value;
    const data = await getCityData(searchName);
    const chartData = getForecastData(data.forecastData);
    const config = getNewConfig(chartData.hours, chartData.temperatures, 'Temperatures Forecast')

    this.setState({
      data,
      chartData,
      config
    });
    
    // this.setChartData();
    console.log('App State after Finding',this.state)
  }

  setTempChart = () => {
    const {chartData} = this.state;
    const config = getNewConfig(chartData.hours, chartData.temperatures, 'Temperatures Forecast');
    this.setState({config})
  }

  setPrecipitationChart = () => {
    const {chartData} = this.state;
    const config = getNewConfig(chartData.hours, chartData.precipitations, 'Precipitations Probability');
    this.setState({config})
  }

  render(){
    const {data} = this.state;
    return (
      <div >
        <Search 
          searchRef = {this.searchInputRef}
          onSearchHandler={this.setCityData}
        >
        </Search>
        <Weather 
          data={data}
          chartData={this.state.config}
          tempChartHandler = {this.setTempChart}
          percipitationChartHandler = {this.setPrecipitationChart}
        />
      </div>
    );
  }
}

export default App;
