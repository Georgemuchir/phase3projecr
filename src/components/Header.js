// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const role = localStorage.getItem('role');

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ddd', position: 'relative' }}>
      <h1>My App</h1>
      <nav style={{ position: 'absolute', right: '10px', top: '10px' }}>
        {isAuthenticated ? (
          <>
            <Link to="/logout" style={{ marginRight: '10px' }}>Logout</Link>
            {role === 'tenant' && <Link to="/tenant-dashboard" style={{ marginRight: '10px' }}>Tenant Dashboard</Link>}
            {role === 'care_taker' && <Link to="/care-taker-dashboard" style={{ marginRight: '10px' }}>Care Taker Dashboard</Link>}
            {role === 'admin' && <Link to="/admin-dashboard" style={{ marginRight: '10px' }}>Admin Dashboard</Link>}
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
