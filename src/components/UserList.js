import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './UserList.css';
import { UserContext } from '../App';

const UserList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  
  const {setUsers , setLoading , setError , userState} = useContext(UserContext);

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
    alert("Do you want to delete user?")
      const updatedUsers = userState.users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      reorderUserIds(updatedUsers); 
    
  };

  const reorderUserIds = (updatedUsers) => {
    const reorderedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1
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
    const newUsersList = [...userState.users, { ...newUser, id: userState.users.length + 1 }];
    setUsers(newUsersList);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button className="add-user-button" onClick={toggleForm}>+</button>

      {userState.loading && <p>Loading users...</p>}
      {userState.error && <p>{userState.error}</p>}
       <div  class="table-container"> 
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
          {userState.users.map(user => (
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
      </div>
      {isFormOpen && (
        <UserForm
          users={userState.users}
          onAddUser={handleAddUser} 
          userToEdit={userToEdit}
          onClose={toggleForm}
        />
      )}
    </div>
  );
};

export default UserList;

