import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({switchToLogin}) => {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const handleRegister = (e) =>{
        e.preventDefault();
        try{
            axios.post(`http://localhost:5000/register`, {email, username, password})
            .then(response=>{
                console.log(response.data)
                navigate('/auth');
                switchToLogin();
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }
    
    return ( 
        <form className="register-form" onSubmit={handleRegister}>
                <h2>Create a new account</h2>
                <label>Username</label>
                <input type="text" name="username" id="username" required={true} value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                <label>Email</label>
                <input type="email" name="email" id="email" required={true} value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type="password" name="password" id="password" required={true} value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="basic-button">Register</button>
        </form>
     );
}
 
export default Register;