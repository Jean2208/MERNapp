import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"
import { Link } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useContext(WorkoutContext)

    const handleDelete = async () => {

        const response = await fetch('/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (

        <div className="workout-details">
            <Link to={`/workout/${workout._id}`} className='details-link'>
                <h4>{workout.title}</h4>
            </Link>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p>{new Date(workout.createdAt).toLocaleDateString('en-CA')}</p>
            <span onClick={handleDelete}>delete</span>
        </div>

    );
}

export default WorkoutDetails;