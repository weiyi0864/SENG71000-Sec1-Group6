import React from 'react';
import { Typography, Container } from '@mui/material';

const SuccessfulLogin = () => {
  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          You are logged in!
        </Typography>
        <Typography variant="body1">
          Welcome! You have successfully logged in to your account.
        </Typography>
      </div>
    </Container>
  );
};

export default SuccessfulLogin;
