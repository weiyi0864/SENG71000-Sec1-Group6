import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import NavBar from './Components/NavBar';
import Typography from '@mui/material/Typography';
import VehicleCard from './Components/VehicleCard';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';

function ViewVehicles() {
    const [vehiclesInfo, setVehiclesInfo] = useState([]);

    const { role, id, store_id } = useParams();
    // Set a default role if 'role' is undefined
    const resolvedRole = role || 'general';

    const [storeData, setStoreData] = useState({ name: 'Loading...' });
    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/stores/get_store?store_id=${store_id}`, {
                    method: 'GET',
                    // Add headers if needed
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    setStoreData(data[0]); // Store the received store data in state
                } else {
                    // Handle error response
                }
            } catch (error) {
                // Handle fetch error
            }
        };

        fetchStoreData();
    }, [store_id]); 

    useEffect(() => {

        const fetchData = async () => {
            try {

                const url = new URL('http://localhost:3001/vehicles/get_all_vehicles');
                url.searchParams.append('store_id', store_id);

                const response = await fetch(url, {
                    method: 'GET',
                    // Add headers if needed

                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                // Transform the data structure as mentioned before
                const transformedData = data.map(vehicle => ({
                    vehicle_id: vehicle.vehicle_id,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    type: vehicle.type,
                    color: vehicle.color,
                    license_plate: vehicle.license_plate,
                    status: vehicle.status,
                    rentPerDay: vehicle.rent_per_day,
                    image: vehicle.imageUrl,
                    imageLabel: 'Vehicle Image',
                    role:resolvedRole,
                    store_id:store_id,
                    user_id:id,
                }));

                setVehiclesInfo(transformedData);
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        fetchData();

    }, []);

    


    return (
        <div>
            <NavBar />

            <Container sx={{ py: 8 }} maxWidth="md">
                <Typography variant="h4" gutterBottom>
                {storeData.store_name}
                </Typography>
                <Grid container spacing={4} marginTop={2}>
                    {vehiclesInfo.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </Grid>


            </Container>


        </div>
    );
}


export default ViewVehicles;