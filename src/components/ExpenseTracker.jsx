// ExpenseTracker.jsx
import React, { useState } from 'react';
import { useUser } from './UserContext';

const ExpenseTracker = ({ onClose }) => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [payer, setPayer] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    setExpenses([...expenses, { payer, item, amount: parseFloat(amount) }]);
    setPayer('');
    setItem('');
    setAmount('');
  };

  const calculateAmounts = () => {
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const numPeople = expenses.length > 0 ? expenses.length : 1;
    const amountPerPerson = totalAmount / numPeople;
    
    return expenses.map(expense => ({
      ...expense,
      amountOwed: amountPerPerson - expense.amount
    }));
  };

  const expensesWithAmountsOwed = calculateAmounts();

  return (
    <div className='expense-tracker'>
      <h2>Expense Tracker</h2>
      <button onClick={onClose}>Close</button>
      <div>
        <input
          type='text'
          placeholder='Payer'
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
        <input
          type='text'
          placeholder='Item'
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expensesWithAmountsOwed.map((expense, index) => (
          <li key={index}>
            {expense.payer} paid for {expense.item}: ${expense.amount.toFixed(2)} - {expense.amountOwed >= 0 ? `is owed $${expense.amountOwed.toFixed(2)}` : `owes $${Math.abs(expense.amountOwed).toFixed(2)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
