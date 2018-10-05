import React from 'react';

export default class Forecaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {numDays: 5};
        console.log(this.days);
    };
    
    daysChanged() {
        this.setState({numDays: 5});
    }

    daysChanged10() {
        this.setState({numDays: 10});
    }
    
    render() {
        let rows = this.props.days.slice(0,this.state.numDays).map(day => {
            return <DailyItem day={day} toggle={this.props.toggle}/>
        });
        return (
            <div>
                <div className="forecast__switch">
                <button className="forecast__switch_0 switch-active" onClick={this.daysChanged.bind(this)}
                style={this.state.numDays === 5 ? {backgroundColor: '#009ad8',color: '#fff'}: {backgroundColor: '#eee',color: '#999'}}>
                    5 days
                </button>
                <button className="forecast__switch_1" onClick={this.daysChanged10.bind(this)}
                style={this.state.numDays === 5 ? {backgroundColor: '#eee',color: '#999'} : {backgroundColor: '#009ad8',color: '#fff'}}>
                    10 days
                </button>
                </div>
                <div>{rows}</div>
            </div>
        );
    }
}

function DailyItem(props) {
    const day = props.day;
    const toggle = props.toggle;
    return (
        <div className="weather-forecast__row">
            <span className="weather-forecast__day">{day.weekday}</span>
            <span className="weather-forecast__icon">
                <img src={day.icon} alt=''/>
            </span>
            <span className="weather-forecast__high">{toggle ? `${day.high.C} c`: `${day.high.F} f`}</span>
            <span className="weather-forecast__low">{toggle ? `${day.low.C} c`: `${day.low.F} f`}</span>
        </div>
    );
}

// export default function Forecaster(props) {
//     console.log(props.days);
//     let rows = props.days.map(day => {
//         return <DailyItem key={day.weekday} day={day} />
//     });
    
//     return (
//         <div>
//             <div className="forecast__switch">
//             <button className="forecast__switch_0 switch-active">
//                 5 days
//             </button>
//             <button className="forecast__switch_1">
//                 10 days
//             </button>
//             </div>
//             <div>{rows}</div>
//         </div>
//     );
// }