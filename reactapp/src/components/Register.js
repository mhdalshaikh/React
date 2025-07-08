import React, {useState } from 'react';
import axios from 'axios';

function Register(){
    const [form,setForm] = useState({username:'',password:'',role:''});
    const handleSubmit = async e=> {
        e.preventDefault();
        try{
            await axios.post("https://react-xzhl.vercel.app/api/user",form);
            alert("Registered successfully");
        }
        catch(er){
            alert(er.message);
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder='Username' onChange={e=> setForm({...form,username:e.target.value})}/>
            <input type="password" placeholder='Password' onChange={e=> setForm({...form,password:e.target.value})}/>
            <input placeholder='Role' onChange={e=> setForm({...form,role:e.target.value})}/>
            <button>Register</button>
        </form>
    );
}
export default Register;
