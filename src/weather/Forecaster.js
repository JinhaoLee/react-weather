import React from 'react';

export default function Forecaster(props) {
    let rows = props.days.map(day => {
        return <DailyItem key={day.weekday} day={day} />
    });
    return (
        <div>
            <div className="forecast__switch">
            <button className="forecast__switch_0 switch-active">
                5 days
            </button>
            <button className="forecast__switch_1">
                10 days
            </button>
            </div>
            <div>{rows}</div>
        </div>
    );
}

function DailyItem(props) {
    const day = props.day;
    return (
        <div className="weather-forecast__row">
            <span className="weather-forecast__day">{day.weekday}</span>
            <span className="weather-forecast__icon">
                <img src={day.icon} alt=''/>
            </span>
            <span className="weather-forecast__high">{day.high}</span>
            <span className="weather-forecast__low">{day.low}</span>
        </div>
    );
}