const express = require('express');
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a workout
router.post('/', postWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// Export the routes to use them in our startup file server.js
module.exports = router
