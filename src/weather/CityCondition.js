import React from 'react';
import umberella from '../images/icon-umberella.png';
import iwind from '../images/icon-wind.png';
import icompass from '../images/icon-compass.png';

export default function CityCondition(props) {
  const {city, weather, temp, humidity, wind, wind_dir, toggle} = props.data;
  return (
    <div>
        <div className="weather-condition__location">{city}</div>
        <div style={{textAlign: 'center', fontSize: '14px'}}>{weather}</div>
        <div className="weather-condition__temp">
        <span style={{ paddingRight: 18}}>{toggle ? `${temp.C} c`: `${temp.F} f`}</span></div>
        <div className="weather-condition__desc">
            <div>
                <img src={umberella} alt=''/> <span className="citem">{humidity}</span>
            </div>
            <div>
                <img src={iwind} alt=''/> <span className="citem">{`${wind} ${'km/h'}`}</span>
            </div>
            <div>
                <img src={icompass} alt=''/> <span className="citem">{wind_dir}</span>
            </div>
        </div>
    </div>
  )
}