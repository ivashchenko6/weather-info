import CityCard from "../cityCard/CityCard";

import './citiesList.scss';

const CitiesList = ({data}) => {
    const items = data.map((item, i) => <CityCard key={i} item={item} />)
    return (
        <main className="main-section">
            <ul className="cities-list">
                {items} 
            </ul>
        </main>
    )
}

export default CitiesList;