import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';

function Hello() {
    return (
        <div>
            <p>test</p>
            <p className="text-black">hello</p>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hello />} />
            </Routes>
        </Router>
    );
}
