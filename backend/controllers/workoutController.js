const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')


const getWorkouts = async (req, res) => {

    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)

}

const getWorkout = async (req, res) => {

    // Get the id property from the params in the request
    const {id} = req.params
    
    // Check if the id passed as a parameter is a valid object type for mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid id type'})
    }

    const workout = await Workout.findById(id)

    // If the id is a valid object type but there's no workout with such id return error
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

const postWorkout = async (req, res) => {
    // Destructuring to extract 'title', 'reps', and 'load' directly from the request body
    const {title, reps, load} = req.body

    try {
        // Use await to pause the execution of the function an wait for the promise returned by the create() method
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid id type'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid id type'})
    }

    // Update the workout by id and update the parameters passed by our body in the request
    // ... notation is the spread operator, grabs all the available properties and "spreads" them into the function
    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)


}

module.exports = {
    getWorkouts,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
}