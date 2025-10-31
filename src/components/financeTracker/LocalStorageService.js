const STORAGE_KEY_TRANSACTIONS = 'finance_tracker_transactions';
const STORAGE_KEY_GOALS = 'finance_tracker_goals';

export const LocalStorageService = {
  getTransactions: () => {
    try {
      const transactions = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      return transactions ? JSON.parse(transactions) : [];
    } catch (error) {
      console.error("Error getting transactions from local storage:", error);
      return [];
    }
  },

  saveTransactions: (transactions) => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions to local storage:", error);
    }
  },

  getGoals: () => {
    try {
      const goals = localStorage.getItem(STORAGE_KEY_GOALS);
      return goals ? JSON.parse(goals) : [];
    } catch (error) {
      console.error("Error getting goals from local storage:", error);
      return [];
    }
  },

  saveGoals: (goals) => {
    try {
      localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
    } catch (error) {
      console.error("Error saving goals to local storage:", error);
    }
  },
};