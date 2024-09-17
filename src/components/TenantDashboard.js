// src/components/TenantDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TenantDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/tenant-protected-route', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Tenant Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default TenantDashboard;
