import { useContext, useState } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';

const WorkoutForm = () => {

    const {dispatch} = useContext(WorkoutContext)
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsPending(true)
        const workout = {title, reps, load}

        const response = await fetch('https://mernapp-s1q9.onrender.com/workouts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(workout)
        })

        const json = await response.json()

        if (!response.ok) {
            setIsPending(false)
            setError(json.error)
            setEmptyFields(json.emptyFields)
            return
        }

        setIsPending(false)
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        setEmptyFields([])
        dispatch({type: 'CREATE_WORKOUT', payload: json})

    }
    //handleSubmit function will trigger a post request to the db
    // i want to set the state of the input as it changes
    // we want error to be outputted is its not null
    // maybe a loading paragraph state that changes when set to false or true? 
    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Reps</label>
            <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <label>Load</label>
            <input 
            type="number" 
            value={load} 
            onChange={(e) => setLoad(e.target.value)}
            className={emptyFields.includes('load') ? 'error' : ''}
            />
            {!isPending && <button>Add Workout</button>}
            {isPending && <button disable>Adding workout...</button>}
            {error && <div className="error">{error}</div>}
        </form>

    );
}
 
export default WorkoutForm;