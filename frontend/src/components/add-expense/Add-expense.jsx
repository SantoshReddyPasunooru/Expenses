import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './add-expense.css';

const Addexpense = () => {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleAddExpense = async () => {
        if (!category || !date || !amount || !description) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const expenseData = { category, date, amount, description };
            const response = await axios.post('http://localhost:9000/addExpense', expenseData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Expense added:', response.data);
            alert('Expense added successfully!');
            clearFormFields();
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense.');
        }
    };

    const clearFormFields = () => {
        setCategory('');
        setDate('');
        setAmount('');
        setDescription('');
    };

    return (
        <div className="add-expense-container">
            <h2>Add a New Expense</h2>
            <div className="add-expense-form">
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="submit-button" onClick={handleAddExpense}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Addexpense;
