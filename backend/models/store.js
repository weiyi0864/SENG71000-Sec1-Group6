const db = require('../config/db'); // Database connection configuration

const storeModel = {
    createStore: (storeData) => {
        // Logic to create a new user in the database
        return db.query('INSERT INTO stores SET ?', storeData);
    },

    getAllStores: () => {
        // Logic to retrieve all stores from the database
        return db.query('SELECT * FROM stores');
    },
    getStoreById: (store_id) =>{
        return db.query('SELECT * FROM stores where store_id= ?',store_id);
    },
    

    // Other methods to interact with users in the database...
};

module.exports = storeModel;