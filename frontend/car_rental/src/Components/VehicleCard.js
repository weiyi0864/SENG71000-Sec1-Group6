import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';


function VehicleCard(props) {
    const { vehicle } = props;


    const handleReservation = async () => {
        // Get store_id, user_id, vehicle_id from vehicle object
        const formData = new FormData();
        formData.append('store_id', vehicle.store_id);
        formData.append('user_id', vehicle.user_id);
        formData.append('vehicle_id', vehicle.vehicle_id);
        
        // Get jwt_token from localStorage
        const jwtToken = localStorage.getItem('jwt_token');

        try {
            const response = await fetch('http://localhost:3001/transactions/add_new_transaction', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                // Handle success, maybe update UI or show a message
                window.location.href = `/view_vehicles/${vehicle.role}/${vehicle.store_id}/${vehicle.user_id}`;

            } else {
                // Handle error response

            }
        } catch (error) {
            // Handle fetch error
            console.log(error);
        }
    };

    return (




        <Grid md={2.5} marginLeft={2} marginTop={1}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={vehicle.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {vehicle.make} - {vehicle.model} - {vehicle.year}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {vehicle.type} - {vehicle.color}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        $ {vehicle.rentPerDay} per day
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {vehicle.license_plate}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {vehicle.status === '0' ? (
                            <span style={{ color: 'green' }}>Available</span>
                        ) : (
                            <span style={{ color: 'orange' }}>Reserved</span>
                        )}
                    </Typography>
                </CardContent>
                <CardActions>
                    {vehicle.role === 'normal_user' && vehicle.status==='0' && (
                        <Button size="small" onClick={handleReservation}>Reserve</Button>
                    )}

                </CardActions>
            </Card>
        </Grid>




    );


}

export default VehicleCard;