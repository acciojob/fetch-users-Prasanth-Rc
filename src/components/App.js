import React, { useState } from 'react';
import axios from 'axios';
import './../styles/App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <button className="btn" onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Get User List'}
      </button>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} width="50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No users to display. Click the button to fetch users.</p>
      )}
    </div>
  );
}

export default App;