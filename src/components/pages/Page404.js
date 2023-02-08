
import './page404.scss';
import fourOFour from '../../images/404.gif'
const Page404 = () => {
    return (
        <div className='error-block'>
            <img src={fourOFour} alt="404" />
        </div>
    )
}

export default Page404;