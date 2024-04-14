// For access to the enviroment file
require('dotenv').config()

// Import express.js
const express = require('express')

// Import the mongoose framework which adds additional functionality for db interaction
const mongoose = require('mongoose')

// Assing all the workouts routes to a constant to use them in middleware later
const workoutRoutes = require('./routes/workouts')

// Get cross origin use
const cors = require('cors');

// Intialize the express.js app
const app = express()

// Provide ability to parse json data to the app
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use the workouts routes in our app and assign them to the /workouts url
app.use('/workouts', workoutRoutes)

// Connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Only start listening for requests once the connection to the db is successful
        app.listen(process.env.PORT, () => {
            console.log(`Connected to the db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Error when connecting to db: ${error}`)
    })




