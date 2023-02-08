
import {Link} from 'react-router-dom';

import cloud from '../../images/cloud.png'
import home from '../../images/home.png'

import './inputCity.scss';
const InputCity = ({changeCity, city}) => {
    

    return (
        <header>
            <Link to="/">
                <img src={home} alt="home" className="image-home"/>       
            </Link>
            <div className="header-wrapper">
                <img src={cloud} alt="cloud" className='cloud_img'/>
                <div className="input-block">
                    <h3>Write your city:</h3>
                <input value={city} onChange={(e)=> changeCity(e)} type="text" />
                </div>
                <img src={cloud} alt="cloud" className='cloud_img'/>
            </div>
        </header>
    )
}

export default InputCity;