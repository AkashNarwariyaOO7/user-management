import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => {
          setUserName(data.name);
          setUserEmail(data.email);
          setUserPhone(data.phone);
          setIsEdit(true);
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `https://jsonplaceholder.typicode.com/users/${id}`
      : 'https://jsonplaceholder.typicode.com/users';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        phone: userPhone,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/');
    })
    .catch(error => console.error('Error saving user:', error));
  };

  return (
    <div className="user-form">
      <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          type="tel"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          required
        />
        <button type="submit">{isEdit ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
