import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Dashboard() {
  const [user, setUser] = useState({ username: '', role: '' });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({ username: decoded.username, role: decoded.role });
    } catch (err) {
      console.error("Invalid token");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-center">
        <h2 className="mb-3">Dashboard</h2>
        <p className="lead">Welcome, <strong>{user.username}</strong></p>
        <p className="text-muted">Role: {user.role}</p>
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
