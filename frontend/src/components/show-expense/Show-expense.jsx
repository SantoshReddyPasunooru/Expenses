import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './show-expense.css';

const ShowExpense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [no, setNo] = useState("1");
  const [categoryInput, setCategoryInput] = useState("family");
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    id: '',
    category: '',
    date: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, [no, categoryInput]);

  const fetchExpenses = async () => {
    let url = '';
    switch (no) {
      case "1":
        url = 'http://localhost:9000/listExpenses';
        break;
      case "2":
        url = `http://localhost:9000/expenses?category=${categoryInput}`;
        break;
      case "3":
        url = 'http://localhost:9000/expenses/filterByMonth?month=2024-01';
        break;
      case "4":
        url = 'http://localhost:9000/highest-amount';
        break;
      case "5":
        url = 'http://localhost:9000/lowest-amount';
        break;
      default:
        url = 'http://localhost:9000/listExpenses';
        break;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setIsEditing(true);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await fetch(`http://localhost:9000/deleteExpense?id=${expenseId}`, { method: 'DELETE' });
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleUpdateExpense = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:9000/editExpense/${currentExpense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentExpense),
      });
      setExpenses(expenses.map(expense => (expense.id === currentExpense.id ? currentExpense : expense)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
      <div className="expense-container">
        <h2 className="expense-heading">
          {no === "1" && "All Expenses"}
          {no === "2" && `Expenses by Category: ${categoryInput}`}
          {no === "3" && "Expenses by Date"}
          {no === "4" && "Expenses by Highest Amount"}
          {no === "5" && "Expenses by Lowest Amount"}
          {no === "6" && "Edit or Delete an Expense"}
        </h2>

        {expenses.length === 0 ? (
            <p>No expenses found.</p>
        ) : (
            <>
              <table className="expense-table">
                <thead>
                <tr>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  {no === "6" && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {expenses.map(expense => (
                    <tr key={expense.id}>
                      <td>{expense.category}</td>
                      <td>{expense.date}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.description}</td>
                      {no === "6" && (
                          <td>
                            <button onClick={() => handleEditExpense(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                          </td>
                      )}
                    </tr>
                ))}
                </tbody>
              </table>
              <div className="total-expenses">Total Expenses: Rs {expenses.reduce((total, expense) => total + expense.amount, 0)}</div>

              {isEditing && (
                  <div className="edit-form-container">
                    <form onSubmit={handleUpdateExpense}>
                      <label>Category: <input type="text" value={currentExpense.category} onChange={(e) => setCurrentExpense({ ...currentExpense, category: e.target.value })} /></label>
                      <label>Date: <input type="date" value={currentExpense.date} onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })} /></label>
                      <label>Amount: <input type="number" value={currentExpense.amount} onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })} /></label>
                      <label>Description: <input type="text" value={currentExpense.description} onChange={(e) => setCurrentExpense({ ...currentExpense, description: e.target.value })} /></label>
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                  </div>
              )}
            </>
        )}
      </div>
  );
};

export default ShowExpense;
