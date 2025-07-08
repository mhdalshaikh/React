import React, {useState } from 'react';
import axios from 'axios';

function Register(){
    const [form,setForm] = useState({username:'',password:''});
    const handleSubmit = async e=> {
        e.preventDefault();
        try{
            await axios.post("https://react-b6su.vercel.app/api/auth/register",form);
            alert("Registered successfully");
        }
        catch(er){
            alert("error");
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder='Username' onChange={e=> setForm({...form,username:e.target.value})}/>
            <input type="password" placeholder='Password' onChange={e=> setForm({...form,password:e.target.value})}/>
            <button>Register</button>
        </form>
    );
}
export default Register;
