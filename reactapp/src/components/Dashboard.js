import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ correct import
function Dashboard() {
const [user, setUser] = useState(null);
useEffect(() => {
const token = localStorage.getItem("token");
if (!token) return;
const decoded = jwtDecode(token);
setUser(decoded.username);
}, []);
return (
<div>
<h2>Dashboard</h2>
<p>Welcome, {user}</p>
</div>
);
}
export default Dashboard;