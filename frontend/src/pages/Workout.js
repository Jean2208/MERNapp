import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

const Workout = () => {

    const { id } = useParams()
    const [workout, setWorkout] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const fetchWorkout = async () => {
        setIsPending(true)
        try {
            const response = await axios.get('https://mernapp-s1q9.onrender.com/workouts/' + id)
            setWorkout(response.data)
            setIsPending(false)
        } catch (error) {
            setError("No such workout")
            setIsPending(false)
        }
    }

    useEffect(() => {
        fetchWorkout()
    }, [id])

    return (
        <>
            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            {workout &&
                <>
                    <h1>{workout.title}</h1>
                    <h2>{new Date(workout.createdAt).toLocaleDateString('en-CA')}</h2>
                    <p><strong>Reps:</strong> {workout.reps}</p>
                    <p><strong>Load:</strong> {workout.load}</p>
                </>
            }
        </>
    );
}

export default Workout;