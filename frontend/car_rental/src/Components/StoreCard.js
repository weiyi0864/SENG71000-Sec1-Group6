import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';



function StoreCard(props) {
    const { store } = props;

    return (
        <Grid item xs={10} md={6}>

            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={store.image}
                    alt={store.imageLabel}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {store.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {store.work_time}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {store.desc}
                    </Typography>
                    {store.role === 'manager' && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                variant="subtitle1" color="primary" style={{ marginRight: '10px' }}
                            >

                                <Link to={`/view_vehicles/${store.role}/${store.store_id}/${store.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    View vehicles
                                </Link>


                            </Typography>
                            <Typography variant="subtitle1" color="primary" style={{ marginRight: '10px' }}>

                                <Link to={`/add_vehicle/${store.role}/${store.store_id}/${store.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Add vehicles
                                </Link>

                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                View transaction
                            </Typography>
                        </div>
                    )}
                    {store.role === 'general' && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography variant="subtitle1" color="primary" style={{ marginRight: '10px' }}>
                                <Link to={`/view_vehicles/${store.role}/${store.store_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    View vehicles
                                </Link>

                            </Typography>

                        </div>
                    )}
                    {store.role === 'normal_user' && (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography variant="subtitle1" color="primary" style={{ marginRight: '10px' }}>
                                <Link to={`/view_vehicles/${store.role}/${store.store_id}/${store.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    View vehicles
                                </Link>

                            </Typography>
                        </div>
                    )}
                </CardContent>

            </Card>

        </Grid>
    );
}

StoreCard.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default StoreCard;