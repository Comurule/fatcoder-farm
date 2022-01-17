const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Set up the express app
const app = express();

//Enable cors
app.use(cors({ origin: true }));

// Parse incoming requests data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Application Routes
app.use('/api/v1', routes);

require('./scheduler')();


module.exports = app;