import React, { useState } from 'react';
import './UserFormPage.css';

const UserFormPage = () => {
  // Default user added initially.
  const [users, setUsers] = useState([
    { id: Date.now(), name: 'Kartavya Mahajan', email: 'kartavya@gmail.com' }
  ]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUserId === null) {
      // CREATE
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
    } else {
      // UPDATE
      setUsers(users.map(user => user.id === editingUserId ? { ...user, ...formData } : user));
      setEditingUserId(null);
    }

    setFormData({ name: '', email: '' });
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingUserId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="userform-page">
      <h1>User Form with CRUD</h1>
      <form onSubmit={handleSubmit} className="userform">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
      </form>
      <div className="user-list">
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserFormPage;