const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const {verifyToken} = require('../middleware/Authenticate');



// test
router.post('/add_new_transaction',verifyToken,transactionsController.createTransaction);  // reserverd 0 
router.post('/start_a_transaction',verifyToken,transactionsController.startTransaction);  // ongoing 1
router.post('/cancel_a_transaction',verifyToken,transactionsController.cancelTransaction); // cancel 3
router.post('/finish_a_transaction',verifyToken,transactionsController.finishTransaction); // return the car 2
router.get('/get_all_transactions_by_store_id',verifyToken,transactionsController.getAllTransactionsByStoreId);
router.get('/get_all_transactions_by_user_id',verifyToken,transactionsController.getAllTransactionsByUserId);


module.exports = router;