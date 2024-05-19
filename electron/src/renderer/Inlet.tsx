import { Outlet } from 'react-router-dom';
import Navbar from './ui_components/Navbar';

const Inlet = () => {
    return (
        <div id="main" className="relative w-screen h-screen flex">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Inlet;
