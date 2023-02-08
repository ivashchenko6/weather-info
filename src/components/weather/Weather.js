import {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";

import Spinner from '../spinner/Spinner'
import useWeatherService from "../../service/WeatherService";


import clearSky from '../../images/weatherState/clearSky.png';
import fewClouds from '../../images/weatherState/fewClouds.png';
import scatteredClouds from '../../images/weatherState/scatteredClouds.png';
import brokenClouds from '../../images/weatherState/brokenClouds.png';
import showerRain from '../../images/weatherState/showerRain.png';
import rain from '../../images/weatherState/rain.png';
import thunderstorm from '../../images/weatherState/thunderstorm.png';
import snow from '../../images/weatherState/snow.png';
import mist from '../../images/weatherState/mist.png';
import questionMark  from '../../images/weatherState/question.png'
import backBtn from '../../images/backButton.png'

import './weather.scss';


const Weather = ({data}) => {
    const {city} = useParams();
    const [weatherCity, setweatherCity] = useState(null);
    const {lat, lon} = data.find(item => item.name.toLowerCase() === city)
    
    const {getWeather, loading, error, clearError} = useWeatherService();
    
    useEffect(() => {
        updateWeather();
    },[city])

    const updateWeather = () => {
        clearError();
        getWeather(lat, lon)
            .then(loadedWeather)
        
    } 
    const loadedWeather = (information) => setweatherCity(information);

    const errorMessage = error ? <h1>Error</h1> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !weatherCity) ? <View city={weatherCity}/> : null; 

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


const View = ({city}) => {
    let weatherState = '';
    const {name, weather, country, id} = city;

    
    
    if(id >=200 && id <=232) {
        weatherState = thunderstorm;
    }else if(id >=300 && id <=321) {
        weatherState = showerRain;
    }else if(id >=500 && id <=504) {
        weatherState = rain;
    }else if(id >=520 && id <=531) {
        weatherState = showerRain;
    }else if(id >=600 && id <=622) {
        weatherState = snow;
    }else if(id >=701 && id <=781) {
        weatherState = mist;
    }else if(id === 800) {
        weatherState = clearSky;
    }else if(id === 801) {
        weatherState = fewClouds;
    }else if(id === 802) {
        weatherState = scatteredClouds;
    }else if(id === 803 || id === 804) {
        weatherState = brokenClouds;
    }else {
        weatherState = questionMark;
    }
    //Пофиксить когда к любой погоде добавляется одинаковая картинка showerRain!
    
    return (
        <div className="city-weather-block">
            <Link to='/'>
                <img src={backBtn} alt="back button" />
            </Link>
            <div className="main-info">
                <div className='img-city'>
                    <img src={weatherState} alt={weather} />
                    <h2>{name}</h2>
                </div>
                
                <div><p>Weather: {weather}</p>
                </div>
            </div>
            
        </div>
    )
}

export default Weather;