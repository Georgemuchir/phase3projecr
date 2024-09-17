import axios from "axios";

const API_URL = "http://localhost:8000/admin";

// Get all users
export const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Register a new user
export const registerUser = async (userData, token) => {
  const response = await axios.post(`${API_URL}/register-user`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a user
export const deleteUser = async (userId, token) => {
  const response = await axios.delete(`${API_URL}/delete-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a user
export const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`${API_URL}/update-user/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
