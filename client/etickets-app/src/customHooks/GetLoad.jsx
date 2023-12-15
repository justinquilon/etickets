import { useEffect, useState } from 'react';

const getLoadData = (apiUrl) => {
    const [data, setData] = useState(null);
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

export default getLoadData;