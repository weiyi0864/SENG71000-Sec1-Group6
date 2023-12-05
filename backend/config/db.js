const mysql = require('mysql2');




// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port:3306,
  user: 'car_rental_app',
  password: '123456',
  database: 'car_rental'
});

// Export a function to execute queries
module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }
};