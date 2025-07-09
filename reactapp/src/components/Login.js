import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white border">
            <h2 className="text-center mb-4">Login</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
  );
}

export default Login;
