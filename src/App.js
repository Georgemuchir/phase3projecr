import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TenantDashboard from './components/TenantDashboard';
import CareTakerDashboard from './components/CareTakerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Logout from './components/Logout';
import Header from './components/Header';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const role = localStorage.getItem('role');

  // Role-based redirection based on the token and role
  const getDashboardRoute = () => {
    if (role === 'tenant') return '/tenant-dashboard';
    if (role === 'care_taker') return '/care-taker-dashboard';
    if (role === 'admin') return '/admin-dashboard';
    return '/';
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Redirect to the correct dashboard based on the role */}
          <Route path="/" element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <Login />} />

          {/* Role-specific dashboard routes */}
          <Route path="/tenant-dashboard" element={isAuthenticated && role === 'tenant' ? <TenantDashboard /> : <Navigate to="/" />} />
          <Route path="/care-taker-dashboard" element={isAuthenticated && role === 'care_taker' ? <CareTakerDashboard /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard/*" element={isAuthenticated && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />

          {/* Logout Route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
