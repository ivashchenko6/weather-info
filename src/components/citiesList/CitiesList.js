import WeatherCard from "../weatherCard/WeatherCard";

import './citiesList.scss';

const CitiesList = ({data}) => {

    
    const items = data.length ? data.map((item, i) => <WeatherCard key={i} item={item} />) : <h1>We don`t have this city</h1>
    
    return (
        <main className="main-section">
            <ul className="cities-list">
                {items} 
            </ul>
        </main>
    )
}

export default CitiesList;