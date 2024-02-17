import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Workout from './pages/Workout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/workout/:id' element={<Workout />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
