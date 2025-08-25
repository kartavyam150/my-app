import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SummaryCharts = ({ transactions }) => {
  // Prepare data for Income vs. Expense Bar Chart
  const getIncomeExpenseData = () => {
    const monthlyData = {}; // { 'YYYY-MM': { income: 0, expense: 0 } }

    transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (transaction.type === 'income') {
        monthlyData[month].income += parseFloat(transaction.amount);
      } else if (transaction.type === 'expense') {
        monthlyData[month].expense += parseFloat(transaction.amount);
      }
    });

    const sortedMonths = Object.keys(monthlyData).sort();

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Income',
          data: sortedMonths.map(month => monthlyData[month].income),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Expense',
          data: sortedMonths.map(month => monthlyData[month].expense),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  };

  // Prepare data for Spending by Category Pie Chart
  const getSpendingByCategoryData = () => {
    const categorySpending = {}; // { 'category': amount }

    transactions.filter(t => t.type === 'expense').forEach(transaction => {
      const category = transaction.category || 'Uncategorized';
      categorySpending[category] = (categorySpending[category] || 0) + parseFloat(transaction.amount);
    });

    const categories = Object.keys(categorySpending);
    const amounts = Object.values(categorySpending);

    const backgroundColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#800000', '#008000', '#000080', '#808000',
      '#800080', '#008080', '#C0C0C0', '#808080', '#FFA07A', '#EE82EE', '#ADFF2F', '#00CED1', '#DDA0DD', '#9ACD32'
    ];

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: categories.map((_, i) => backgroundColors[i % backgroundColors.length]),
        },
      ],
    };
  };

  const incomeExpenseData = getIncomeExpenseData();
  const spendingByCategoryData = getSpendingByCategoryData();

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to resize freely
    plugins: {
      legend: {
        position: 'bottom', // Move legend to bottom for better chart area
        labels: {
          font: {
            size: 10, // Smaller font size for legends
          },
        },
      },
      title: {
        display: true,
        text: 'Income vs. Expense Over Time',
        font: {
          size: 14, // Smaller title font
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '₹ ' + context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {
            size: 10, // Smaller font for x-axis labels
          },
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹ ' + value;
          },
          font: {
            size: 10, // Smaller font for y-axis labels
          },
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to resize freely
    plugins: {
      legend: {
        position: 'bottom', // Move legend to bottom
        labels: {
          font: {
            size: 10, // Smaller font size for legends
          },
        },
      },
      title: {
        display: true,
        text: 'Spending by Category',
        font: {
          size: 14, // Smaller title font
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += '₹ ' + context.parsed.toFixed(2);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="summary-charts-container">
      <h2>Financial Summary</h2>
      <div className="charts-grid"> {/* New div for grid layout */}
        <div className="chart-wrapper">
          {incomeExpenseData.labels.length > 0 ? (
            <Bar data={incomeExpenseData} options={barChartOptions} />
          ) : (
            <p>No income or expense data to display.</p>
          )}
        </div>
        <div className="chart-wrapper">
          {spendingByCategoryData.labels.length > 0 ? (
            <Pie data={spendingByCategoryData} options={pieChartOptions} />
          ) : (
            <p>No expense data to display for categories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCharts;