import React, { useState } from 'react';
import axios from 'axios';
function Login() {
const [form, setForm] = useState({ username: '',
password: '' });
const handleSubmit = async e => {
e.preventDefault();
const res = await
axios.post("https://react-nine-murex-34.vercel.app/api/auth/login",
form);
localStorage.setItem("token", res.data.token);
window.location.href = "/dashboard";
};
return (
<form onSubmit={handleSubmit}>
<h2>Login</h2>
<input placeholder="Username"
onChange={e => setForm({ ...form, username:
e.target.value })} />
<input type="password"
placeholder="Password"
onChange={e => setForm({ ...form, password:
e.target.value })} />
<button>Login</button>
</form>
);
}
export default Login;
