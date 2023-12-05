const express = require('express');
const router = express.Router();
const storesController = require('../controllers/storesController');
const {verifyToken} = require('../middleware/Authenticate');
const { route } = require('./users');



// test
router.post('/add_new_store',verifyToken,storesController.createStore);
router.get('/get_all_stores',storesController.getAllStores);
router.get('/get_store',storesController.getStoreById);

module.exports = router;