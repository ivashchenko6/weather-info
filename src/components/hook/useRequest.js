import {useState, useCallback} from 'react';

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '106836eab5f7af1aab7b58bc49249596';
    const requestCall = useCallback ( async (lat,lon) => {
        
        setLoading(true);

        try { //Fix here
            const response = await fetch(`${url}?lat=${lat}&lon=${lon}&appid=${apiKey}`, );
            
            
            if(!response.ok) {
                
                throw new Error('Could not fetch');
                
            }

            
            const data = await response.json();
            setLoading(false);
            console.log(data)
            return data;
            
        } catch(e) {  //Fix here 
            setLoading(false);
            setError(e.message);
        
            throw e;
        }
        
    }, [])

    const clearError = useCallback(() => setError(null), []);
    return {loading, error, requestCall, clearError}
}


