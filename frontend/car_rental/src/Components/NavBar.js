import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import CarRentalIcon from '@mui/icons-material/CarRental';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useParams } from 'react-router-dom';




function NavBar() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwt_token'));

  const { role,id } = useParams(); 
  // Set a default role if 'role' is undefined
  const resolvedRole = role || 'general';
  const pages = {
    general: ['stores', 'about us'],
    manager: ['view stores', 'add store'],
    normal_user: ['view stores', 'view transaction'],
  };

  const pages_routes = {
    general: ['/view_stores', '/'],
    manager: [`/view_stores/manager/${id}`, `/add_store/manager/${id}`],
    normal_user: [`/view_stores/normal_user/${id}`, 'view transaction'],
  };


  const handleLogout = () => {
    // Clear jwt_token in localStorage
    localStorage.removeItem('jwt_token');

    // Redirect to the main page or desired route after logout
    window.location.href = "/";
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CarRentalIcon sx={{ fontSize: 40 }} />
          <Typography
            variant="h6"
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages[resolvedRole].map((page,index) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={pages_routes[resolvedRole][index]}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>



            {jwtToken === null ? (
              <IconButton component={Link} to="/login" sx={{ color: 'white', ml: 'auto' }}>
                <LoginIcon />
                <Typography
                  sx={{ marginLeft: '10px' }}

                >
                  Log In
                </Typography>

              </IconButton>
            ) : (
              <IconButton onClick={handleLogout} component={Link} to="/" sx={{ color: 'white', ml: 'auto' }}>
                <LogoutIcon />
                <Typography
                  sx={{ marginLeft: '10px' }}

                >
                  Log Out
                </Typography>

              </IconButton>
            )}
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;