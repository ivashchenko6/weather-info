import axios from 'axios';
import {useState, useCallback} from 'react';

const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '106836eab5f7af1aab7b58bc49249596';
    const request = useCallback ( async (lat,lon) => {
        
        setLoading(true);

        try {
            const response =await axios.get(`${url}?lat=${lat}&lon=${lon}&appid=${apiKey}`)

            if(response.statusText !== 'OK') {
                throw new Error('Could not fetch');
            }
            
            setLoading(false);

            return response.data; //{coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}

        } catch(e) { 
            setLoading(false);
            setError(e.message);
            throw e;
        }
        
    }, [])

    const clearError = useCallback(() => setError(null), []);
    return {loading, error, request, clearError}
}

export default useHttp;










// const useHttp = () => {

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const url = 'https://api.openweathermap.org/data/2.5/weather';
//     const apiKey = '106836eab5f7af1aab7b58bc49249596';
//     const request = useCallback ( async (lat,lon) => {
        
//         setLoading(true);

//         try {
//             const response = await fetch(`${url}?lat=${lat}&lon=${lon}&appid=${apiKey}`, );
            
//             if(!response.ok) {
//                 throw new Error('Could not fetch');
//             }

//             const data = await response.json(); //{coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}
//             setLoading(false);
//             // console.log(`Пришла дата `, data)
            
//             return await data;

//         } catch(e) { 
//             setLoading(false);
//             setError(e.message);
//             throw e;
//         }
        
//     }, [])

//     const clearError = useCallback(() => setError(null), []);
//     return {loading, error, request, clearError}
// }

// export default useHttp;

