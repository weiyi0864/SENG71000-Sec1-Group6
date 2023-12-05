import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import GeneralHeader from './Components/GeneralHeader';
import Footer from './Components/Footer';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const formData = new FormData();

    for (const field in registerData) {
      formData.append(field, registerData[field]);
    }
    console.log(formData.get('first_name'));
    fetch('http://localhost:3001/users/create_user', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('User registered successfully!');
          // Redirect to the home page on successful registration
          // Replace '/home' with your desired home route
          window.location.href = '/login';
        } else {
          console.error('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div>
      <GeneralHeader />
      <Container maxWidth="sm">
        <div style={{ marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="last_name"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                name="confirm_password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>

            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                style={{ width: '100%' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </div>

  );
};

export default Register;
