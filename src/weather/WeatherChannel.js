import React, {Component} from 'react';

import CityCondition from './CityCondition';
import Forecaster    from './Forecaster';
import {fetchConditionData,fetchForecastData} from '../api/weather';

export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);        
        // use static data to fill initial state first
        this.state = {
            curCity: 'beijing',
            condition: {
              city:  '',
              temp: {C:'', F:''},
              weather: '',
              humidity: '',
              wind: '',
              wind_dir: ''
            },
            days:  [],
            toggle: true
        }
    }
    componentDidMount() {
      this.handleSearch();
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
        wind_dir: data.wind_dir,
        // toggle: this.state.condition.toggle   
      };
      this.setState({condition})
    }

    onForecastLoad(data){
      let days = data.simpleforecast.forecastday.map(day => ({ 
        weekday: day.date.weekday.slice(0, 3),
        high: {C: day.high.celsius, F: day.high.fahrenheit},
        low: {C: day.low.celsius, F: day.low.fahrenheit},
        icon: day.icon_url }));
      this.setState({days})
    }

    handleSearch(){
      const city = this.state.curCity;
      fetchConditionData(city).then(data => {
        this.onConditionalLoad(data);
      });
      fetchForecastData(city).then(data => {
        this.onForecastLoad(data);
      });
    }

    tempSwitch() {
      // var condition = {...this.state.condition}
      // condition.toggle = !this.state.condition.toggle;
      var toggle = !this.state.toggle;
      this.setState({toggle});
    }

    render() {
      return (
        <React.Fragment>
        <nav>
            <div style={{flex: 1}}>
            <input className="search-input" value={this.state.curCity} onChange={this.handleCityChange.bind(this)} />
            <button className="search-btn" onClick={this.handleSearch.bind(this)}><i className="fa fa-search" /></button>
            <button className="temp-switch" onClick={this.tempSwitch.bind(this)}>
                <i className="fa fa-thermometer-empty" aria-hidden="true" style={{paddingRight: 5}} />
                C
            </button>
            </div>
        </nav>
        <main>
          <section className='weather-condition'>
            <CityCondition data={this.state.condition} toggle={this.state.toggle}/>
          </section>
          <section className='weather-forecast'>
            <Forecaster days={this.state.days} toggle={this.state.toggle}/>
          </section>
        </main>
        </React.Fragment>
      )
    }
}