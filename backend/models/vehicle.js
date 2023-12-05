const { stat } = require('fs');
const db = require('../config/db'); // Database connection configuration

const vehicleModel = {
    createVehicle: (vehicleData) => {
        
        return db.query('INSERT INTO vehicles SET ?', vehicleData);
    },
    // get all vehicles within a store
    getAllVehicles: (store_id) => {
        return db.query('SELECT * FROM vehicles WHERE store_id = ?', [store_id]);
    },
    getVehicleById: (vehicle_id) =>{
        return db.query('SELECT * FROM vehicles WHERE vehicle_id = ?', [vehicle_id]);
    },

    setVehicleStatusById: (vehicle_id,status) => {
        return db.query('UPDATE vehicles SET status = ? WHERE vehicle_id = ?', [status, vehicle_id]);
    }
    // Other methods to interact with users in the database...
};

module.exports = vehicleModel;