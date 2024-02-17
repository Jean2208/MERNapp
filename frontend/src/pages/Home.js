import { useContext, useEffect} from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutContext } from '../context/WorkoutContext';


const Home = () => {

    const {workouts, dispatch} = useContext(WorkoutContext)

    // useEffect to load fetch once
    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
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