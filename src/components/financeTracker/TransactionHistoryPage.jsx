import React, { useState, useEffect } from 'react';
import TransactionTable from './TransactionTable';
import { LocalStorageService } from './LocalStorageService';

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(LocalStorageService.getTransactions());
  }, []);

  const updateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map(
      (transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)
    );
    setTransactions(updatedTransactions);
    LocalStorageService.saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    LocalStorageService.saveTransactions(updatedTransactions);
  };

  return (
    <div className="transaction-history-page">
      <h1>Transaction History</h1>
      <TransactionTable
        transactions={transactions}
        onUpdateTransaction={updateTransaction}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default TransactionHistoryPage;