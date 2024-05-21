import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Inlet from './Inlet';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inlet />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
