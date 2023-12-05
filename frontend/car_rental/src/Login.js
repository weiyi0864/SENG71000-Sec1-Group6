import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import GeneralHeader from './Components/GeneralHeader';
import Footer from './Components/Footer';
import Link from '@mui/material/Link';
const Login = () => {
  const [loginData, setLoginData] = useState({ phone_number: '', password: '' });

  const handleLogin = () => {
    const formData = new FormData();

    for (const field in loginData) {
      formData.append(field, loginData[field]);
    }

    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('User logged in successfully!');
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error('Login failed'); // Throw an error for failed responses
        }
      })
      .then((data) => {
        console.log('User ID:', data.user_id);
        console.log('User Role:', data.user_role);
        // Set the JWT token in localStorage
        localStorage.setItem('jwt_token', data.token);
        // normal user
        if (data.user_role == "normal_user") {
          window.location.href = '/view_stores/normal_user/'+data.user_id;
        }else if (data.user_role == "manager"){
          window.location.href = '/view_stores/manager/'+data.user_id;
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <GeneralHeader />
      <Container maxWidth="sm">
        <div style={{ marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone_number"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Don't have an account?{' '}
                <Link href="/register" color="primary">
                  Register here
                </Link>
              </Typography>
            </Grid>

          </Grid>
        </div>
      </Container>
      <Footer />
    </div>

  );
};

export default Login;
