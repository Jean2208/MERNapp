import { useState } from 'react';

const WorkoutForm = () => {

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsPending(true)
        const workout = {title, reps, load}

        const response = await fetch('/workouts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(workout)
        })

        const json = await response.json()

        if (!response.ok) {
            setIsPending(false)
            setError(json.error)
            return
        }

        setIsPending(false)
        setTitle('')
        setReps('')
        setLoad('')

    }
    //handleSubmit function will trigger a post request to the db
    // i want to set the state of the input as it changes
    // we want error to be outputted is its not null
    // maybe a loading paragraph state that changes when set to false or true? 
    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Reps</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <label>Load</label>
            <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
            {!isPending && <button>Add Workout</button>}
            {isPending && <button disable>Adding workout...</button>}
            {error && <div className="error">{error}</div>}
        </form>

    );
}
 
export default WorkoutForm;