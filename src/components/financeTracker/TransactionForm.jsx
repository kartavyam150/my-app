import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction, onClose }) => {
  const initialFormState = {
    type: 'expense', // Default to expense
    amount: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    category: '',
    description: '',
    paymentMethod: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all required fields: Amount, Date, and Category.');
      return;
    }
    onAddTransaction(formData);
    setFormData(initialFormState); // Reset form
    if (onClose) onClose(); // Close modal if onClose prop is provided
  };

  // Quick-add options (example)
  const quickAddExpense = (amount, category, description = '') => {
    setFormData({
      ...initialFormState,
      type: 'expense',
      amount: amount,
      category: category,
      description: description,
      date: new Date().toISOString().split('T')[0],
    });
  };

  const quickAddIncome = (amount, category, description = '') => {
    setFormData({
      ...initialFormState,
      type: 'income',
      amount: amount,
      category: category,
      description: description,
      date: new Date().toISOString().split('T')[0],
    });
  };


  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="saving">Saving</option>
            <option value="investment">Investment</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="e.g., 50.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g., Groceries, Salary"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Weekly shopping, January paycheque"
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            placeholder="e.g., Credit Card, Bank Transfer, Cash"
          />
        </div>

        <button type="submit" className="add-transaction-button">Add Transaction</button>
      </form>

    </div>
  );
};

export default TransactionForm;