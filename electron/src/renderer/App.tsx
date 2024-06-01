import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Inlet from './Inlet';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Teams from './pages/Teams';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="players" element={<Players />} />
                    <Route path="teams" element={<Teams />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
