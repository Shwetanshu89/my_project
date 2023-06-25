import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    empData();
  }, []);

  const empData = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');

     
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>Employee List</h1>
      <input
        type="text"
        value={searchName}
        onChange={handleSearchChange}
        placeholder="Enter name"
      />
      {filteredUsers.map((user) => (
           <div >
        <div key={user.id} className='employee-card' >
         
          <img src={user.avatar} alt="User" />
          <p>{user.id}</p>
          </div>
          <p> {user.first_name}</p>
        
        </div>
      ))}
    </div>
  );
};

export default App;