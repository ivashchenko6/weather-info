import {useState, useEffect} from 'react';


import {Routes, Route, Outlet} from 'react-router-dom';

import WeatherService from '../../service/WeatherService';
import CitiesList from '../citiesList/CitiesList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import InputCity from '../inputCity/InputCity';
import Page404 from '../pages/Page404';
import Weather from '../weather/Weather';

import dataBase from './dataBase.json';

const App = () => {
    const [data, setData] = useState([...dataBase.countries]); //data of each city with name, latitude, longitude
    const [city, setCity] = useState('');
    

    

    const changeCity = (e) => setCity(city => e.target.value);

    const showByTerm = (items, city) => {
        if(city.length === 0) {
            return items
        }else {
            return items.filter(item => {
                return item.name.toLowerCase().indexOf(city.toLowerCase()) > -1;
            })
        }
    } 


    return (
        <div className="app">
            <ErrorBoundary>
                <InputCity city={city} changeCity={changeCity}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<CitiesList data={showByTerm(data, city)}/>} />
                    <Route path='/weather/:city' element={<Weather data={data}/>}/>
                    <Route path='*' element={<Page404 />} />
                </Routes>
                <Outlet/>

                

            </ErrorBoundary>
        </div>
    )
}

export default App;