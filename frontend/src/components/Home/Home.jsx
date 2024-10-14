import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Navigation bar with links */}
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/add-expense" className="nav-link">Add Expense</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/show-expense" className="nav-link">Show Expense</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <div className="content">
                <h2>MOKA: Revolutionizing Expense Tracking</h2>
                <p>
                    MOKA, the brainchild of Mohak and Kalyani, stands as a beacon of innovation in the realm of expense tracking applications. With meticulous attention to detail and a passion for user-centric design, they have crafted a seamless platform that redefines how individuals manage their finances.
                </p>
                <p>
                    MOKA offers a holistic approach to expense tracking, empowering users to effortlessly monitor their expenditures, set budgets, and achieve financial goals with ease. Whether tracking daily expenses or planning for the future, MOKA empowers users to take control of their financial well-being.
                </p>
            </div>
        </div>
    );
};

export default Home;
