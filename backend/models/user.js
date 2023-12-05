const db = require('../config/db'); // Database connection configuration

const userModel = {
    createUser: (userData) => {
        // Logic to create a new user in the database
        return db.query('INSERT INTO users SET ?', userData);
    },

    verifyManagerCode: (code) => {
        // Query to check if the provided code matches the manager's code
        return db.query('SELECT * FROM users WHERE user_role = "manager" AND code = ?', code);
    },
    // Other verification methods...

    // get user by phone number
    getUserByPhoneNumber: async (phone_number) => {
        return db.query('SELECT * FROM users WHERE phone_number = ?', phone_number);
    },

    getPasswordById: async (user) => {
        // Query to fetch the password for a user by their user_id
        
        const result = await db.query('SELECT password FROM users WHERE user_id = ?',user[0].user_id);
        return result.length > 0 ? result[0].password : null;
    },
    

    // Other methods to interact with users in the database...
};

module.exports = userModel;