import React from "react";
import {Line} from 'react-chartjs-2'

const ForecastChart = (props) => {

    if(!props.data) return <></>
    return (
        <div className='forecast-chart'>
            <Line data={props.data}/>
        </div>
    )
    
}

export default ForecastChart;


