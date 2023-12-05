import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <div>
        <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
            HE Car Rental 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="/manager_register">
                Manager Register Portal
            </Link>{' '}
        </Typography>

    </div>
    
    
  );
}

function FrontPageFooter(props) {
  const { 
    description = "Ride With US NOW", 
    title = "HE Car Rental"
    } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

FrontPageFooter.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FrontPageFooter;