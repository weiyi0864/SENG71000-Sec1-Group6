import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

import Footer from './Components/Footer';



import NavBar from './Components/NavBar';
import { useParams } from 'react-router-dom';

const MangerAddVehicle = () => {

    const { role,id, store_id } = useParams(); 
    const [vehicleData, setVehicleData] = useState({
        year: '',
        make: '',
        model: '',
        color: '',
        type: '',
        license_plate:'',
        rentPerDay:'',
        
    });
    


    const handleChange = (e) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
    };

    
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadFile, setUploadFile] = useState('');

    const handleFileChange = (event) => {
        const fileName = event.target.files[0].name;
        setSelectedFile(fileName);
        setUploadFile(event.target.files[0]);
    };

    const handleAddNewVehicle = async () => {
        const formData = new FormData();
        formData.append('year', vehicleData.year);
        formData.append('make', vehicleData.make);
        formData.append('model', vehicleData.model);
        formData.append('color', vehicleData.color);
        formData.append('type', vehicleData.type);
        formData.append('licensePlate', vehicleData.license_plate);
        formData.append('rentPerDay',vehicleData.rentPerDay);
        formData.append('image', uploadFile);
        formData.append('status', '0');
        formData.append('storeId',store_id);

        const jwtToken = localStorage.getItem('jwt_token');
        
        try {
            const response = await fetch('http://localhost:3001/vehicles/add_new_vehicle', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log("Successfully Added A New Vehicle , directed to view vehicles page");
                
                window.location.href = '/view_vehicles/manager/'+store_id+'/'+id;
                
            } else {
                console.log("Failed to add a new vehicle");
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error occurred:', error);
        }
    };

    

    return (
        <div>
            <NavBar />
            <Container maxWidth="sm">
                <div style={{ marginTop: '50px' }}>
                    <Typography variant="h4" gutterBottom>
                        Manager Add Vehicle To
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Store Name
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Vehicle Make"
                                name="make"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Vehicle Model"
                                name="model"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Year"
                                name="year"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Color"
                                name="color"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Type"
                                name="type"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        

                        <Grid item xs={12}>
                            <TextField
                                label="License Plate"
                                name="license_plate"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Rent Per Day"
                                name="rentPerDay"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Typography variant="p" sx={{ marginLeft: '20px' }}>
                            {selectedFile ? `Selected Image: ${selectedFile}` : 'Select Vehicle Image'}
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddNewVehicle}
                                style={{ width: '100%' }}
                            >
                                Add A New Vehicle
                            </Button>
                        </Grid>






                    </Grid>

                </div>
            </Container>
            <Footer />
        </div>

    );
};

export default MangerAddVehicle;
