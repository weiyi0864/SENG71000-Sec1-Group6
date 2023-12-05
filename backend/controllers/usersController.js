const userModel = require('../models/user');

// Middleware to handle form-data parsing
const multer = require('multer');
const upload = multer().none(); // Parse only text fields, no files
// userController.js (or your user-related controller file)
const { generateToken } = require('../middleware/Authenticate');

exports.createUser = (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { first_name, last_name, password, email, code, phone_number, user_role } = req.body;
        // Create the user data object based on the table schema
        const userData = {
            first_name,
            last_name,
            password,
            email,
            code,
            phone_number,
            user_role: user_role || 'normal_user' // Default value for user_role if not provided
        };

        userModel.createUser(userData)
            .then(result => {
                // Handle successful user creation
                res.status(201).json({ message: 'User created successfully', userId: result.insertId });
            })
            .catch(err => {
                // Handle error during user creation
                console.error('Error creating user:', err);
                res.status(500).json({ error: 'Error creating user' });
            });
    })
};

exports.createManager = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { first_name, last_name, password, email, code, phone_number } = req.body;
        
        userModel.verifyManagerCode(code)
            .then(manager => {
                if (manager.length > 0) {
                    // Manager code is verified, proceed to create the manager
                    userModel.createUser({
                        first_name,
                        last_name,
                        password,
                        email,
                        code,
                        phone_number,
                        user_role: 'manager' // Assign the user_role as 'manager'
                    })
                    .then(result => {
                        console.log('Manager created successfully');
                        res.status(201).json({ message: 'Manager created successfully' });
                    })
                    .catch(err => {
                        console.error('Error creating manager:', err);
                        res.status(500).json({ error: 'Error creating manager' });
                    });
                } else {
                    // Manager code doesn't match
                    res.status(401).json({ error: 'Invalid manager code' });
                }
            }
            )
            .catch(err => {
                console.error('Error verifying manager code:', err);
                res.status(500).json({ error: 'Error verifying manager code' });
            });
    })
};

exports.userLogin = async (req, res) => { // Add 'async' here
    upload(req, res, async (err) => { // Also, add 'async' here
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        const { phone_number, password } = req.body;

        try {
            // Get user ID based on the provided phone number
            const user = await userModel.getUserByPhoneNumber(phone_number);
            if (!user.length) {
                return res.status(401).json({ message: 'User not found' });
            }


            // Get the stored password for the user by their user_id
            const storedPassword = await userModel.getPasswordById(user);

            if (!storedPassword) {
                return res.status(500).json({ message: 'Password not available' });
            }

            if (password === storedPassword) {
                // password match generate new token
                // Generate token using the userId
                
                const user_id = user[0].user_id;
                const user_role = user[0].user_role;
                //console.log(user_id);
                const token = generateToken(user_id);
                // Send token and userId as a response
                res.status(200).json({ user_id, token,user_role,message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Login error' });
        }

    })
};

exports.test = async (req, res) => { // Add 'async' here
    upload(req, res, async (err) => { // Also, add 'async' here
        if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).json({ error: 'Error parsing form data' });
            return;
        }
        res.status(200).json({ message: 'hello world' });

    })
};




