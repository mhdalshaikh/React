import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://react-xzhl.vercel.app/api/user", form);
      alert("Registered successfully");
    } catch (er) {
      alert(er.response?.data?.error || er.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white border mt-5">
      <h2 className="text-center mb-4">Register</h2>

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

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Role"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
  );
}

export default Register;
