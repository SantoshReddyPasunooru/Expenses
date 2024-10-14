import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div className="start-container">
            <div className="content">
                <h1 className="heading">Track the Monthly Expenses</h1>
                <p className="description">
                    Hey Splitwise Members, update the tracking expenses for further verification
                </p>
                <button className="login-button" onClick={() => navigate("/loginsignup")}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Start;
