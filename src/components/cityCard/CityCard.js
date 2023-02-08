import {Link} from 'react-router-dom'
import './cityCard.scss';

const CityCard = ({item}) => {
    const {name, weather, country} = item;

    return (
        <Link to={`weather/${name.toLowerCase()}`}>
            <li className="list-item">
                <div className="city-card-wrapper">
                    {name}
                </div>
            </li>
        </Link>
    )
}

export default CityCard;
