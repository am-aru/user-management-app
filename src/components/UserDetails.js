import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserForm from './UserForm';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      });
  }, [id]);

  return (
    <div>
      <Link to="/">Back to Users</Link>
      {user ? <UserForm userToEdit={user} /> : <p>Loading user details...</p>}
    </div>
  );
};

export default UserDetails;
