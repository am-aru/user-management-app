import React, {useState , createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css';

const initState = {users: [] , loading : true, error:null}
export const UserContext = createContext(initState);


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userState = {users , loading , error};

  return (
    <Router>
      <UserContext.Provider value={{setUsers , setLoading , setError , userState}}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
