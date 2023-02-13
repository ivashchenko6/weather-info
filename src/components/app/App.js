import {useState, useEffect} from 'react';
import dataBase from '../../service/dataBase.json';

import {Routes, Route, Outlet} from 'react-router-dom';

import CitiesList from '../citiesList/CitiesList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import InputCity from '../inputCity/InputCity';
import Page404 from '../pages/Page404';





import useHttp from '../hook/useHttp';


const App = () => {
    const countriesDB = [...dataBase.countries];
    const {request, clearError, loading, error} = useHttp();
    const [data, setData] = useState([]); //data of each city with name, latitude, longitude
    const [city, setCity] = useState('');

    

    useEffect(() => {
        downloadWeathers();
    },[])

    const transformCorrectData = (city) => {
        
        return {
            name: city.name,
            id: city.weather[0].id,
            weather: city.weather[0].main,
            
        }
    }

    const downloadWeathers =async () => {
        const items = [...dataBase.countries].map(async (item) => {
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


    return (
        <div className="app">
            <ErrorBoundary>
                <InputCity city={city} changeCity={changeCity}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<CitiesList data={showByTerm(data, city)}/>} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
                <Outlet/>
            </ErrorBoundary>
        </div>
    )
}

export default App;