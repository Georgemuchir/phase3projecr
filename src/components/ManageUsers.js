import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminApi";
import UserCard from "./UserCard";

const ManageUsers = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId, token);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ManageUsers;
