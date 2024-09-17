import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/');
        window.location.reload();
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/admin-protected-route', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching protected data:', error);
        // Redirect to login page on authentication error
        navigate('/');
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div>
      <h1>{message || 'Admin Dashboard'}</h1>
      <nav>
        <ul>
          <li><Link to="manage-users">Manage Users</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="manage-users" element={<ManageUsers />} />
          {/* You can add more routes here as needed */}
          <Route path="" element={<div><h2>Welcome to Admin Dashboard</h2></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
