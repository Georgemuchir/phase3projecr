import React, { useState } from "react";
import { registerUser } from "../services/adminApi";

const RegisterUser = ({ token }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData, token);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div>
      <h1>Register New User</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="role" placeholder="Role" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
