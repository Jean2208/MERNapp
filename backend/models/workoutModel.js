const mongoose = require('mongoose')

// Initialize the Schema class
const Schema = mongoose.Schema

//  Schemas define the structure of the data for a specific collection
// Create an instance of the Schema class
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)

