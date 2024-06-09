import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HardinessMap({ speciesId }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/hardiness-map?species_id=${speciesId}&key=[YOUR-API-KEY]`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        fetchData();
    }, [speciesId]);

    return (
        <div>
            <h1>Hardiness Map Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default HardinessMap;
