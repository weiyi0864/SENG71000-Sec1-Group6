const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


// Import route files
const usersRoute = require('./routes/users');
const storesRoute = require('./routes/stores');
const vehiclesRoute = require('./routes/vehicles');
const transactionsRoute  = require('./routes/transactions');

// Enable CORS for all routes
app.use(cors());
// Use route files
app.use('/users', usersRoute);
app.use('/stores',storesRoute);
app.use('/vehicles',vehiclesRoute);
app.use('/transactions',transactionsRoute);
// Set up a route to serve static files (images)

app.use('/images', express.static(path.join(__dirname, 'Images')));
app.use('/vehicle_images', express.static(path.join(__dirname, 'Vehicle_Images')));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
