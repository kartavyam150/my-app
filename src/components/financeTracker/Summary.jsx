import React from 'react';

const Summary = ({ transactions }) => {
  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === 'income') {
        totalIncome += amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += amount;
      }
    });

    const netSavings = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netSavings };
  };

  const { totalIncome, totalExpenses, netSavings } = calculateTotals();

  return (
    <div className="finance-summary-container">
      <h2>Overall Financial Summary</h2>
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p>₹ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card expenses">
          <h3>Total Expenses</h3>
          <p>₹ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card savings">
          <h3>Net Savings</h3>
          <p>₹ {netSavings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;