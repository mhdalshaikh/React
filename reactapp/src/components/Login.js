import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://react-xzhl.vercel.app/api/auth", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
