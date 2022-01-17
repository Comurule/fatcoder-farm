// Load all environmental variable
require('dotenv').config(); 

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "fatcoder_farm",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "fatcoder_farm",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_USERNAME,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
};
