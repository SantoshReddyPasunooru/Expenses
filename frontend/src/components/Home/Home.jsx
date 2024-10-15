import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Background image */}
            <div className="background-image"></div>
            <div className="overlay"></div>

            {/* Navigation bar with links positioned at the top-right */}
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/add-expense" className="nav-link">Add Expense |</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/show-expense" className="nav-link">Show Expense |</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <div className="content">
                <text>Student Monthly Expense Portal</text>
                <p>
                    Welcome to the Student Monthly Expenses Portal! This platform allows you to easily track, manage, and review your monthly expenses in one place. Add new expenses, review your spending, and keep your finances organized with ease.
                </p>
                <p>
                    Use the navigation options to add a new expense, view your expense history, or log out of the system. Keep track of your budget and ensure financial responsibility throughout your student journey.
                </p>
            </div>
        </div>
    );
};

export default Home;
