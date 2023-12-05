const transactionModel = require('../models/transaction');
const vehicleModel = require('../models/vehicle');

// Middleware to handle form-data parsing
const multer = require('multer');
const upload = multer().none(); // Parse only text fields, no files


exports.createTransaction = (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { store_id, user_id, vehicle_id } = req.body;
        // Create the user data object based on the table schema
        const transactionData = {
            store_id,
            user_id,
            vehicle_id,
            status: '0',
            reserved_date: new Date()
        };
        await transactionModel.createTransaction(transactionData);
            

        vehicleModel.setVehicleStatusById(vehicle_id,'1')
            .then(result => {
                // Handle successful user creation
                res.status(201).json({ message: 'Vehicle status set successfully' });
            })
            .catch(err => {
                // Handle error during user creation
                console.error('Error setting vehicle status:', err);
                res.status(500).json({ error: 'Error setting vehicle status' });
            });
        


    })
};

exports.startTransaction = (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { transaction_id } = req.body;
        // Create the user data object based on the table schema
        const transactionData = {
            transaction_id,
            status_code: '1',
        };
        transactionModel.updateTransactionStatus(transactionData)
            .then(result => {
                // Handle successful user creation
                res.status(201).json({ message: 'Transaction started successfully' });
            })
            .catch(err => {
                // Handle error during user creation
                console.error('Error starting a transaction:', err);
                res.status(500).json({ error: 'Error starting a transaction' });
            });


    })
};

exports.cancelTransaction = (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { transaction_id } = req.body;
        // Create the user data object based on the table schema
        const transactionData = {
            transaction_id,
            status_code: '3',
        };
        await transactionModel.updateTransactionStatus(transactionData);
        // get transaction by id
        let transaction = await transactionModel.getTransactionById(transaction_id);
        const vehicle_id = transaction[0].vehicle_id;

        vehicleModel.setVehicleStatusById(vehicle_id,'0')
            .then(result => {
                // Handle successful user creation
                res.status(201).json({ message: 'Vehicle status set successfully' });
            })
            .catch(err => {
                // Handle error during user creation
                console.error('Error setting vehicle status:', err);
                res.status(500).json({ error: 'Error setting vehicle status' });
            });
            


    })
};

exports.finishTransaction = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error parsing form data:', err);
                res.status(500).json({ error: 'Error parsing form data' });
                return;
            }
            const { transaction_id } = req.body;

            // Create the user data object based on the table schema
            const transactionData = {
                transaction_id,
                status_code: '2',
            };

            // Update transaction status
            await transactionModel.updateTransactionStatus(transactionData);

            const transactionReturnData = {
                transaction_id,
                return_date: new Date(),
            };

            // Update return date
            await transactionModel.updateTransactionReturnDate(transactionReturnData);
            
            // get transaction by id
            let transaction = await transactionModel.getTransactionById(transaction_id);

            transaction = transaction[0];
            // get transaction data by transaction_id and calculate cost
            let vehicle = await vehicleModel.getVehicleById(transaction.vehicle_id);
            vehicle = vehicle[0];

            //console.log(transaction);
            //console.log(vehicle);
            
            // Calculate the difference in milliseconds between return_date and reserved_date
            const timeDifferenceMs = new Date(transaction.return_date) - new Date(transaction.reserved_date);

            // Convert milliseconds to days
            const timeDifferenceDays = timeDifferenceMs / (1000 * 60 * 60 * 24);
            //console.log(timeDifferenceDays);
            //console.log(parseFloat(vehicle.rent_per_day));
            // Calculate the cost based on time difference and rent_per_day
            let amount_of_cost = timeDifferenceDays * parseFloat(vehicle.rent_per_day);

            // If you want to round the cost to 2 decimal places
            amount_of_cost = Math.round(amount_of_cost * 100) / 100;

            // write amount back to transaction

            await transactionModel.updateTransactionAmountById(transaction_id,amount_of_cost);

            // set vehicle status back to avalaible
            await vehicleModel.setVehicleStatusById(transaction.vehicle_id,'0');
            

            // Both updates were successful
            res.status(201).json({ message: 'Transaction finished successfully' ,amount_of_cost:amount_of_cost});
        });
    } catch (err) {
        // Handle any errors during the updates
        console.error('Error finishing transaction', err);
        res.status(500).json({ error: 'Error finishing transaction' });
    }
};

exports.getAllTransactionsByStoreId = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }

        // Access other form fields along with the uploaded image
        const {store_id} = req.body;

        try {
            const transaction_list = await transactionModel.getAllTransactionsByStoreId(store_id);
            
            res.status(200).json(transaction_list);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving transactions by store id' });
        }
        
    });
};

exports.getAllTransactionsByUserId = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }

        // Access other form fields along with the uploaded image
        const {user_id} = req.body;
        //console.log(user_id);
        try {
            const transaction_list = await transactionModel.getAllTransactionsByUserId(user_id);
            
            res.status(200).json(transaction_list);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving transactions by user id' });
        }
        
    });
};