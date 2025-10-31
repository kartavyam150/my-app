import React, { useState } from 'react';

const GoalTracker = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, isModal = false, onClose }) => {
  const initialFormState = {
    name: '',
    targetAmount: '',
    currentAmount: 0,
    dueDate: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingGoalId, setEditingGoalId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.dueDate) {
      alert('Please fill in all required fields: Name, Target Amount, and Due Date.');
      return;
    }

    if (editingGoalId) {
      onUpdateGoal({ ...formData, id: editingGoalId });
      setEditingGoalId(null);
    } else {
      onAddGoal(formData);
    }
    setFormData(initialFormState);
    if (onClose) onClose();
  };

  const handleEditClick = (goal) => {
    setFormData({ ...goal });
    setEditingGoalId(goal.id);
  };

  const handleCancelEdit = () => {
    setFormData(initialFormState);
    setEditingGoalId(null);
  };

  const calculateProgress = (goal) => {
    if (goal.targetAmount === 0) return 0;
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  return (
    <div className="goal-tracker-container">
      {isModal ? null : <h2>Financial Goals</h2>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goalName">Goal Name:</label>
          <input
            type="text"
            id="goalName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., New Car, Down Payment"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            placeholder="e.g., 25000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentAmount">Current Amount:</label>
          <input
            type="number"
            id="currentAmount"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="goalDescription">Description:</label>
          <textarea
            id="goalDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Saving for a new family car"
          ></textarea>
        </div>

        <button type="submit" className="add-goal-button">{editingGoalId ? 'Update Goal' : 'Add Goal'}</button>
        {editingGoalId && <button type="button" className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>}
      </form>

      {isModal ? null : (
        <div className="goals-list">
          <h3>Your Goals</h3>
          {goals.length === 0 ? (
            <p>No goals set yet.</p>
          ) : (
            <ul>
              {goals.map((goal) => (
                <li key={goal.id}>
                  <div>
                    <h4>{goal.name}</h4>
                    <p>Target: ₹ {parseFloat(goal.targetAmount).toFixed(2)} | Current: ₹ {parseFloat(goal.currentAmount).toFixed(2)}</p>
                    <p>Due: {goal.dueDate}</p>
                    {goal.description && <p>Description: {goal.description}</p>}
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${calculateProgress(goal)}%` }}
                      >
                        {calculateProgress(goal).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  <div className="goal-actions">
                    <button className="edit-button" onClick={() => handleEditClick(goal)}>Edit</button>
                    <button className="delete-button" onClick={() => onDeleteGoal(goal.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalTracker;