import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <Link to={`/edit/${user.id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
