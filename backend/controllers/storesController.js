const storeModel = require('../models/store');

// Middleware to handle form-data parsing
const multer = require('multer');

// userController.js (or your user-related controller file)
const path = require('path');
const fs = require('fs');

// Set up Multer storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Images')); // Save files to the 'Images' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix); // Set unique filename for uploaded images
    },
});

const upload = multer({ storage }).single('image');


exports.createStore = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            res.status(500).json({ error: 'Error uploading image' });
            return;
        }

        // Access other form fields along with the uploaded image
        const { store_name, store_address, city, postal_code, store_desc, contact_number, start_time, end_time } = req.body;
        const { filename } = req.file; // 'filename' contains the unique filename generated by multer

        try {
            
            // Save the store details and image filename to the database
            const newStore = await storeModel.createStore({
                store_name,
                store_address,
                city,
                postal_code,
                store_description: store_desc,
                contact_number,
                start_time: new Date(start_time),
                end_time: new Date(end_time),
                store_image_filename: filename, // Store the image filename in the database
            });

            res.status(201).json({ message: 'Store created successfully', store: newStore });
        } catch (error) {
            console.error('Error creating store:', error);
            res.status(500).json({ error: 'Error creating store' });
        }
    });
};

exports.getAllStores = async (req, res) => {
    try {
        const stores = await storeModel.getAllStores();
        
        const storesWithImageUrls = stores.map(store => {
            const filename = store.store_image_filename;
            return {
                ...store,
                imageUrl: `http://${req.headers.host}/images/${filename}`
            };
        });
        res.status(200).json(storesWithImageUrls);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving stores' });
    }
};

exports.getStoreById = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }

        // Access other form fields along with the uploaded image
        const {store_id} = req.query;
        
        try {
            const store = await storeModel.getStoreById(store_id);
            res.status(200).json(store);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving vehicles' });
        }

        
    });
};