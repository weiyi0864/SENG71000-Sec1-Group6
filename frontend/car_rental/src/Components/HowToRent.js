import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


class HowToRent extends React.Component {
  render() {
    return (
        <div>
            <Container maxWidth="sm" style={{marginTop:'40px'}}>
                <Typography
                component="h3"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Steps To Rent a Car
                </Typography>
                
                <Typography variant="h5" align="left" color="text.primary" paragraph>
                    Step1 - Find the perfect car
                </Typography>
                <Typography variant="h6" align="left" color="text.secondary" paragraph>
                    Enter a location and date and browse thousands of cars shared by local hosts.
                </Typography>
                <Typography variant="h5" align="left" color="text.primary" paragraph>
                    Step2 - Book your trip
                </Typography>
                <Typography variant="h6" align="left" color="text.secondary" paragraph>
                    Book online, choose a protection plan, and say hi to your host! 
                    Cancel for free up to 24 hours before your trip.
                </Typography>
                <Typography variant="h5" align="left" color="text.primary" paragraph>
                    Step3 - Hit the road
                </Typography>
                <Typography variant="h6" align="left" color="text.secondary" paragraph>
                    Have the car delivered or pick it up from your host. Check in with the app, grab the keys, and hit the road!
                </Typography>
                
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                </Stack>
            </Container>
        </div>
    );
  }
}

export default HowToRent;