import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    // Fetch initial users
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    // if (window.confirm("Are you sure you want to delete this user?")) {
      // Filter out the user to delete
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      reorderUserIds(updatedUsers); // Reorder IDs after deletion
    
  };

  const reorderUserIds = (updatedUsers) => {
    const reorderedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1 // Assign new ID based on index
    }));
    setUsers(reorderedUsers);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setUserToEdit(null);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  };

  const handleAddUser = (newUser) => {
    // Add a new user with ID based on current length
    const newUsersList = [...users, { ...newUser, id: users.length + 1 }];
    setUsers(newUsersList);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button className="add-user-button" onClick={toggleForm}>+</button>

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <UserForm
          onAddUser={handleAddUser} // Pass the add user handler
          userToEdit={userToEdit}
          onClose={toggleForm}
        />
      )}
    </div>
  );
};

export default UserList;

