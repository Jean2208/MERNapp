import { useContext, useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutContext } from '../context/WorkoutContext';

const Home = () => {

    // Use local state from our context
    const { workouts, dispatch } = useContext(WorkoutContext)

    const fetchWorkouts = async () => {
        const response = await fetch(`https://mernapp-s1q9.onrender.com/workouts`)
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
    }

    // useEffect to load fetch once
    useEffect(() => {
        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>

    );
}

export default Home;