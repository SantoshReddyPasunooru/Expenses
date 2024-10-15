import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div className="start-container">
            <div className="background-image"></div>
            <div className="overlay"></div>

            <div className="content">
                <h1 className="heading">Student Expenses Portal</h1>
                <p className="description">
                    Welcome to the Student Monthly Expenses Portal! Keep track of your expenses and manage your budget efficiently.
                </p>
                <button className="login-button" onClick={() => navigate("/loginsignup")}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Start;
