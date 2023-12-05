const db = require('../config/db'); // Database connection configuration

const transactionModel = {
    createTransaction: (transactionData) => {
        
        return db.query('INSERT INTO transactions SET ?', transactionData);
    },

    getTransactionById: (transaction_id) => {
        // Logic to retrieve all transactions from the database
        return db.query('SELECT * FROM transactions WHERE transaction_id = ?', [transaction_id]);
    },


    getAllTransactionsByStoreId: (store_id) => {
        // Logic to retrieve all transactions from the database
        return db.query('SELECT * FROM transactions WHERE store_id = ?', [store_id]);
    },
    
    getAllTransactionsByUserId: (user_id) => {
        // Logic to retrieve all transactions from the database
        return db.query('SELECT * FROM transactions WHERE user_id = ?', [user_id]);
    },


    updateTransactionAmountById:(transaction_id,amount) =>{
        return db.query('UPDATE transactions SET amount = ? WHERE transaction_id = ?', [amount, transaction_id]);
    },
    updateTransactionStatus:(transactionData) =>{
        const {transaction_id,status_code} = transactionData;
        return db.query('UPDATE transactions SET status = ? WHERE transaction_id = ?', [status_code, transaction_id]);
    },

    updateTransactionReturnDate:(transactionData) =>{
        const {transaction_id,return_date} = transactionData;
        return db.query('UPDATE transactions SET return_date = ? WHERE transaction_id = ?', [return_date, transaction_id]);
    },

    // Other methods to interact with users in the database...
};

module.exports = transactionModel;