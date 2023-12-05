import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import NavBar from './Components/NavBar';
import StoreCard from './Components/StoreCard';
import { useState, useEffect } from 'react';


function ViewStores() {

    const [storesInfo, setStoresInfo] = useState([]);

    const { role, id } = useParams();
    // Set a default role if 'role' is undefined
    const resolvedRole = role || 'general';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/stores/get_all_stores');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                // Transform the data structure as mentioned before
                const transformedData = data.map(store => ({
                    role:resolvedRole,
                    store_id:store.store_id,
                    user_id:id,
                    name: store.store_name,
                    work_time: `From ${new Date(store.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${new Date(store.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                    desc: store.store_description,
                    image: store.imageUrl,
                    imageLabel: 'Store Image',
                }));

                setStoresInfo(transformedData);
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <NavBar />
            <Grid container spacing={4} sx={{ marginLeft: 1, marginTop: 1, display: 'flex', alignItems: 'center' }}>
                {storesInfo.map((store) => (
                    <StoreCard key={store.title} store={store} />
                ))}
            </Grid>

        </div>
    );
}

export default ViewStores;