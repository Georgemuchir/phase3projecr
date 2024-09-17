import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.username}?`);
    if (confirmDelete) {
      onDelete(user.id);
    }
  };

  return (
    <div className="user-card">
      <h3>{user.username} - {user.role}</h3>
      <p>{user.email}</p>
      <div className="user-actions">
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/admin/update/${user.id}`}>Update</Link>
      </div>
    </div>
  );
};

export default UserCard;
