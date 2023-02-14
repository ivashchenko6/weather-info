import {useEffect} from 'react';


import Spinner from '../spinner/Spinner'

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


import './weather.scss';
import useHttp from '../hook/useHttp';


const WeatherCard = ({item}) => {
    
    const {loading, error, clearError} = useHttp();
    
    useEffect(() => {
        clearError();
    },[])


    

    const errorMessage = error ? <h1>Error</h1> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View city={item}/> : null; 

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
    const {name, weather,temperature, id} = city;

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
    
    
    return (
        <div className="city-weather-block">
            <div className="main-info">
                <div className='img-city'>
                    <img src={weatherState} alt={weather} />
                    <h2>{name}</h2>
                    <h1 className='temperature'>{temperature}°C</h1>
                </div>
                
                <div><p className='weather-text'>Weather: {weather}</p>
                </div>
            </div>
            
        </div>
    )
}

export default WeatherCard;