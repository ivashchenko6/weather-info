import {useHttp} from '../components/hook/useRequest'

const useWeatherService = () => {
    const {loading, error, requestCall, clearError} = useHttp();
    const getWeather = async (lat, lon) => {
        const res = await requestCall(lat, lon);
        
        return transformRightData(res);
    }

    const transformRightData = (city) => {
        return {
            name: city.name,
            id: city.weather[0].id,
            weather: city.weather[0].main,
            country: city.sys.country,
            
        }
    }
    
    return {getWeather, loading, error, clearError};
}

export default useWeatherService;


