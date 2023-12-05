import React from 'react';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Typography from '@mui/material/Typography';

function GeneralHeader() {
    return (
        <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'30px' }}>
            <CarRentalIcon sx={{ fontSize: 80 }} />
            <Typography
                variant="h3"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 5,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                HE Car Rental
            </Typography>
        </div>
    );
}

export default GeneralHeader;