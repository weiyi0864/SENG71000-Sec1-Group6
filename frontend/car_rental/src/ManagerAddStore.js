import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

import Footer from './Components/Footer';

import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import NavBar from './Components/NavBar';
import { useParams } from 'react-router-dom';

const MangerAddStore = () => {

    const { role,id } = useParams(); 
    const [storeData, setStoreData] = useState({
        store_name: '',
        store_address: '',
        city: '',
        postal_code: '',
        store_desc: '',
        contact_number:'',
    });

    const handleChange = (e) => {
        setStoreData({ ...storeData, [e.target.name]: e.target.value });
    };

    const [startTime, setStartTime] = useState(dayjs('2022-04-17T09:30'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T18:30'));
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadFile, setUploadFile] = useState('');

    const handleFileChange = (event) => {
        const fileName = event.target.files[0].name;
        setSelectedFile(fileName);
        setUploadFile(event.target.files[0]);
    };

    const handleAddNewStore = async () => {
        const formData = new FormData();
        formData.append('store_name', storeData.store_name);
        formData.append('store_address', storeData.store_address);
        formData.append('city', storeData.city);
        formData.append('postal_code', storeData.postal_code);
        formData.append('store_desc', storeData.store_desc);
        formData.append('contact_number', storeData.contact_number);
        formData.append('start_time', startTime);
        formData.append('end_time', endTime);
        formData.append('image', uploadFile);

        const jwtToken = localStorage.getItem('jwt_token');
        
        try {
            const response = await fetch('http://localhost:3001/stores/add_new_store', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log("Successfully Added New Store, directed to view stores page");
                window.location.href = '/view_stores/manager/'+id;
                
            } else {
                console.log("Failed to add a new store");
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
                        Manager Add Store
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Store Name"
                                name="store_name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Store Address"
                                name="store_address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="city"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Postal Code"
                                name="postal_code"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Store Description"
                                name="store_desc"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                rows={4}
                                multiline
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Contact Number"
                                name="contact_number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                        </Grid>



                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={12} sm={6} >
                                <TimePicker
                                    label="start time"
                                    defaultValue={startTime}
                                    onChange={(newValue) => setStartTime(newValue)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TimePicker
                                    label="end time"
                                    defaultValue={endTime}
                                    onChange={(newValue) => setEndTime(newValue)}
                                />
                            </Grid>
                        </LocalizationProvider>
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
                            {selectedFile ? `Selected Image: ${selectedFile}` : 'Select Store Image'}
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddNewStore}
                                style={{ width: '100%' }}
                            >
                                Add A New Store
                            </Button>
                        </Grid>






                    </Grid>

                </div>
            </Container>
            <Footer />
        </div>

    );
};

export default MangerAddStore;
