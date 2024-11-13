// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      
      const { token } = response.data;
      // Decode token to get the user role (in practice, use a library like jwt-decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      // Save the token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on user role
      if (role === 'patient') navigate('/patient-dashboard');
      else if (role === 'caretaker') navigate('/caretaker-dashboard');
      else if (role === 'admin') navigate('/admin-dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
