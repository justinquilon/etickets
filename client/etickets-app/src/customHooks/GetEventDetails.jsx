import { useEffect, useState } from 'react';

const getEventDetails = (apiUrl) => {
    const [data, setData] = useState({});
    // console.log(apiUrl)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                console.log(result)
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);           
            }
        };
        fetchData();
    }, [apiUrl]);
    return data;
};

export default getEventDetails;