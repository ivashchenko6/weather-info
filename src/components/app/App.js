import {useState, useEffect} from 'react';
import dataBase from '../../service/dataBase.json';

import {Routes, Route, Outlet} from 'react-router-dom';

import CitiesList from '../citiesList/CitiesList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import InputCity from '../inputCity/InputCity';
import Page404 from '../pages/Page404';




import errorGif from '../../images/error.gif'
import useHttp from '../hook/useHttp';
import Spinner from '../spinner/Spinner';


const App = () => {
    const countriesDB = [...dataBase.countries];
    const {request, loading, error, clearError} = useHttp();
    const [data, setData] = useState([]); //data of each city with name, latitude, longitude
    const [city, setCity] = useState('');

    

    useEffect(() => {
        clearError();
        downloadWeathers();
    },[])

    const transformCorrectData = (city) => {
        
        return {
            name: city.name,
            id: city.weather[0].id,
            weather: city.weather[0].description[0].toUpperCase() + city.weather[0].description.slice(1),
            temperature: Math.round(city.main.temp - 273.15)
        }
    }
    //
    const downloadWeathers =async () => {
        const items = countriesDB.map(async (item) => {
            const response = await request(item.lat, item.lon);
            return transformCorrectData(response);
        })
        const result = await Promise.all(items);
        setData(result)
    }

    const changeCity = (e) => setCity(city => city = e.target.value);

    const showByTerm = (items, city) => {
        if(city.length === 0) {
            return items
        }else {
            return items.filter(item => {
                return item.name.toLowerCase().indexOf(city.toLowerCase()) > -1;
            })
        }
    } 

    const errorMessage = error ? <img src={errorGif} alt='error'/> : null;
    const spinner = loading ? <Spinner /> : null;
    const items = !(loading && error) ? <View showByTerm={showByTerm} data={data} city={city} /> : null



    return (
        <div className="app">
            <ErrorBoundary>
                <InputCity city={city} changeCity={changeCity}/>
            </ErrorBoundary>
            <ErrorBoundary>
                {errorMessage}
                {spinner}
                {items}
                <Outlet/>
            </ErrorBoundary>
        </div>
    )
}

const View = ({showByTerm, data, city}) => {
    return (
        <Routes>
            <Route path='/' element={<CitiesList data={showByTerm(data, city)}/>} />
            <Route path='*' element={<Page404 />} />
            
        </Routes>
    )
}


export default App;