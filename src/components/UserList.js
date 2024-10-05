import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import './UserList.css'; // Assuming we have a separate CSS file for styles

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility
  const [userToEdit, setUserToEdit] = useState(null); // State for the user being edited

  useEffect(() => {
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(err => {
          setError('Failed to delete user');
        });
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle form visibility
    setUserToEdit(null); // Reset the user to edit when opening the form
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button className="add-user-button" onClick={toggleForm}>+</button> {/* Button to open modal */}

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
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
          users={users}
          setUsers={setUsers}
          userToEdit={userToEdit}
          onClose={toggleForm} // Pass toggle function to UserForm
        />
      )}
    </div>
  );
};

export default UserList;
