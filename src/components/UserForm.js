import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css'; // Ensure you have the CSS for modal styling

const UserForm = ({ users, setUsers, userToEdit = null, onClose }) => {
  const [formData, setFormData] = useState(userToEdit || {
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || formData.name.length < 3) return alert('Name is required and must be at least 3 characters');
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return alert('Email is required and must be valid');
    if (!formData.phone) return alert('Phone is required');
    
    const url = userToEdit
      ? `https://jsonplaceholder.typicode.com/users/${userToEdit.id}`
      : 'https://jsonplaceholder.typicode.com/users';

    const method = userToEdit ? 'put' : 'post';

    axios[method](url, formData)
      .then((response) => {
        if (method === 'post') {
          setUsers([...users, response.data]);
        } else {
          setUsers(users.map(user => user.id === userToEdit.id ? response.data : user));
        }
        onClose(); // Close the modal after submission
      })
      .catch((err) => {
        console.error('Failed to save user:', err);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="user-form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <h2>{userToEdit ? 'Edit User' : 'Create User'}</h2>
          <span className="close-button" onClick={onClose}>&times;</span>
          
          <div className="form-group">
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label>Address (Street):</label>
            <input
              name="street"
              value={formData.address.street}
              onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
              required
              placeholder="Enter street address"
            />
          </div>
          
          <div className="form-group">
            <label>Address (City):</label>
            <input
              name="city"
              value={formData.address.city}
              onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
              required
              placeholder="Enter city"
            />
          </div>
          
          <div className="form-group">
            <label>Company Name (Optional):</label>
            <input
              name="companyName"
              value={formData.company.name}
              onChange={(e) => setFormData(prev => ({ ...prev, company: { name: e.target.value } }))}
              placeholder="Enter company name"
            />
          </div>
          
          <div className="form-group">
            <label>Website (Optional):</label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
            />
          </div>

          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
