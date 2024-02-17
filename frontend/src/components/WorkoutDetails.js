import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"

const WorkoutDetails = ({ workout }) => {

    const {dispatch} = useContext(WorkoutContext)

    const handleDelete = async () => {
        const response = await fetch('/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p>{workout.createdAt}</p>
            <button onClick={handleDelete}>delete</button>
        </div>
    );
}
 
export default WorkoutDetails;