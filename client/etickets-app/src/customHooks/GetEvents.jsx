import { useEffect, useState } from 'react';

const getEvents = (apiUrl) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);           
            }
        };
        fetchData();
    }, [apiUrl]);
    return data;
};

export default getEvents;