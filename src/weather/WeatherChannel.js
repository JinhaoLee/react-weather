import React, {Component} from 'react';

import CityCondition from './CityCondition';
import Forecaster    from './Forecaster';
import {fetchConditionData,fetchForecastData} from '../api/weather';

export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);
        // use static data to fill initial state first
        this.state = {
            curCity: 'brisbane',
            condition: {
              city:  'Brisbane, Au',
              temp: {C:'12'},
              weather: 'Clear',
              humidity: '70%',
              wind: '3',
              wind_dir: 'N'
            },
            days:  [
                {weekday: 'Wed', high:23, low:18, icon:'http://icons.wxug.com/i/c/k/clear.gif'},
                {weekday: 'Thu', high:29, low:18, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: 'Fri', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: 'Thu', high:29, low:18, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: 'Fri', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'}
            ]
        }
    }

    handleCityChange(event){
      const value = event.target.value;
      this.setState({curCity: value});
    }

    onConditionalLoad(data){
      const condition = {
        city:  data.display_location.full,
        temp: {C: data.temp_c, F: data.temp_f},
        weather: data.weather,
        humidity: data.relative_humidity,
        wind: data.wind_kph,   
        wind_dir: data.wind_dir    
      };
      this.setState({condition})
    }

    onForecastLoad(data){
      let days = data.simpleforecast.forecastday.map(day => ({ 
        weekday: day.date.weekday.slice(0, 3),
        high: day.high.celsius,
        low: day.low.celsius,
        icon: day.icon_url }));
      days = days.slice(0, 3);
      this.setState({days})
    }

    handleSearch(){
      const city = this.state.curCity;
      fetchConditionData(city, this.onConditionalLoad.bind(this));
      fetchForecastData(city, this.onForecastLoad.bind(this));
    }

    render() {
      return (
        <React.Fragment>
        <nav>
            <div style={{flex: 1}}>
            <input className="search-input" value={this.state.curCity} onChange={this.handleCityChange.bind(this)} />
            <button className="search-btn" onClick={this.handleSearch.bind(this)}><i className="fa fa-search" /></button>
            <button className="temp-switch">
                <i className="fa fa-thermometer-empty" aria-hidden="true" style={{paddingRight: 5}} />
                C
            </button>
            </div>
        </nav>
        <main>
          <section className='weather-condition'>
            <CityCondition data={this.state.condition} />
          </section>
          <section className='weather-forecast'>
            <Forecaster days={this.state.days} />
          </section>
        </main>
        </React.Fragment>
      )
    }
}