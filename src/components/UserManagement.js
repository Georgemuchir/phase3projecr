import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', username: '', email: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/admin/register-user', newUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
      setNewUser({ username: '', email: '', password: '', role: '' });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://127.0.0.1:8000/admin/update-user/${updateUser.id}`, updateUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
      setUpdateUser({ id: '', username: '', email: '', role: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:8000/admin/delete-user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <h3>Register User</h3>
        <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <input type="text" placeholder="Role (tenant, care_taker, admin)" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h3>Update User</h3>
        <input type="text" placeholder="User ID" value={updateUser.id} onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })} />
        <input type="text" placeholder="Username" value={updateUser.username} onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })} />
        <input type="email" placeholder="Email" value={updateUser.email} onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} />
        <input type="text" placeholder="Role (tenant, care_taker, admin)" value={updateUser.role} onChange={(e) => setUpdateUser({ ...updateUser, role: e.target.value })} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div>
        <h3>Users List</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username} ({user.email}) - {user.role}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
