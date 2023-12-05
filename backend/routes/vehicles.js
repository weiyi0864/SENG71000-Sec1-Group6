const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiclesController');
const {verifyToken} = require('../middleware/Authenticate');



// test
router.post('/add_new_vehicle',verifyToken,vehiclesController.createVehicle);
router.get('/get_all_vehicles',vehiclesController.getAllVehicles);

module.exports = router;