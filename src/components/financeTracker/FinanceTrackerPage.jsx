import React, { useState, useEffect } from 'react';
import { LocalStorageService } from './LocalStorageService';
import TransactionForm from './TransactionForm';
import SummaryCharts from './SummaryCharts';
import GoalTracker from './GoalTracker';
import Summary from './Summary';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

import './FinanceTracker.css';

const FinanceTrackerPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTransactions(LocalStorageService.getTransactions());
    setGoals(LocalStorageService.getGoals());
  }, []);

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, { ...newTransaction, id: Date.now() }];
    setTransactions(updatedTransactions);
    LocalStorageService.saveTransactions(updatedTransactions);
    setIsTransactionModalOpen(false); // Close modal after adding
  };

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

  const addGoal = (newGoal) => {
    const updatedGoals = [...goals, { ...newGoal, id: Date.now() }];
    setGoals(updatedGoals);
    LocalStorageService.saveGoals(updatedGoals);
    setIsGoalModalOpen(false); // Close modal after adding
  };

  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map(
      (goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)
    );
    setGoals(updatedGoals);
    LocalStorageService.saveGoals(updatedGoals);
  };

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    LocalStorageService.saveGoals(updatedGoals);
  };

  return (
    <div className="finance-tracker-page">
      <h1>Personal Finance Tracker</h1>

      <div className="finance-tracker-content">
        <Summary transactions={transactions} />
        <div className="finance-tracker-dashboard">
          <button onClick={() => setIsTransactionModalOpen(true)}>Add New Transaction</button>
          <button onClick={() => setIsGoalModalOpen(true)}>Add New Goal</button>
          <button onClick={() => navigate('/finance-tracker/history')}>View Transaction History</button>
          <SummaryCharts transactions={transactions} />
          {/* GoalTracker component will be rendered inside a modal */}
        </div>
      </div>

      <Modal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} title="Add New Transaction">
        <TransactionForm onAddTransaction={addTransaction} onClose={() => setIsTransactionModalOpen(false)} />
      </Modal>

      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} title="Add New Goal">
        <GoalTracker goals={goals} onAddGoal={addGoal} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} isModal={true} onClose={() => setIsGoalModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default FinanceTrackerPage;