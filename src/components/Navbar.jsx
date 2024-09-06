import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>User Management</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create User</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
