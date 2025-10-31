import React, { useState } from 'react';

const TransactionTable = ({ transactions, onUpdateTransaction, onDeleteTransaction }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = (typeof a[sortConfig.key] === 'string' && sortConfig.key !== 'date') ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
    const bValue = (typeof b[sortConfig.key] === 'string' && sortConfig.key !== 'date') ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const typeMatch = filterType === 'all' || transaction.type === filterType;
    const categoryMatch = filterCategory === '' || transaction.category.toLowerCase().includes(filterCategory.toLowerCase());
    return typeMatch && categoryMatch;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEditClick = (transaction) => {
    setEditingTransactionId(transaction.id);
    setEditedTransaction({ ...transaction });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSaveEdit = () => {
    onUpdateTransaction(editedTransaction);
    setEditingTransactionId(null);
    setEditedTransaction({});
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
    setEditedTransaction({});
  };

  return (
    <div className="transaction-table-container">
      <h2>Transaction History</h2>

      <div className="filters">
        <label htmlFor="filterType">Filter by Type:</label>
        <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
          <option value="saving">Saving</option>
          <option value="investment">Investment</option>
        </select>

        <label htmlFor="filterCategory">Filter by Category:</label>
        <input
          type="text"
          id="filterCategory"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          placeholder="Enter category"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('type')}>Type</th>
            <th onClick={() => requestSort('amount')}>Amount</th>
            <th onClick={() => requestSort('date')}>Date</th>
            <th onClick={() => requestSort('category')}>Category</th>
            <th onClick={() => requestSort('description')}>Description</th>
            <th onClick={() => requestSort('paymentMethod')}>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              {editingTransactionId === transaction.id ? (
                <>
                  <td>
                    <select name="type" value={editedTransaction.type} onChange={handleEditChange}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="saving">Saving</option>
                      <option value="investment">Investment</option>
                    </select>
                  </td>
                  <td><input type="number" name="amount" value={editedTransaction.amount} onChange={handleEditChange} /></td>
                  <td><input type="date" name="date" value={editedTransaction.date} onChange={handleEditChange} /></td>
                  <td><input type="text" name="category" value={editedTransaction.category} onChange={handleEditChange} /></td>
                  <td><input type="text" name="description" value={editedTransaction.description} onChange={handleEditChange} /></td>
                  <td><input type="text" name="paymentMethod" value={editedTransaction.paymentMethod} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{transaction.type}</td>
                  <td className={transaction.type === 'expense' ? 'text-danger' : 'text-success'}>
                    ₹ {transaction.amount}
                  </td>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.paymentMethod}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(transaction)}>Edit</button>
                    <button className="delete-button" onClick={() => onDeleteTransaction(transaction.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan="7">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;