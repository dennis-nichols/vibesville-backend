'use strict';

//requires and modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobsHandler = require('./jobs.js');
// const { resourceLimits } = require("worker_threads");

//middleware
const app = express();
app.use(cors());
app.use(express.json());

//Mongo connection

// Set port
const PORT = process.env.PORT || 3002;

//----- ENDPOINTS--------

app.get('/', (req, res) => {
  console.log('The server is up!');
  res.status(200).send('Welcome to the server. Beep Boop Beep.');
});


app.get('/jobs', jobsHandler);



// Improper URL handling
app.get('*', (request, response) => {
  response.send('Page not found');
});

// Server error handling
app.use((error, req, res, next) => {
  res.status(500).send(error.message + 'error');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
