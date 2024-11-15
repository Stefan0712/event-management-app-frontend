import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Login = ({showPopup}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {login} = useAuth();
    const [loginError, setLoginError] = useState()

    const handleLogin = (e) =>{
        e.preventDefault();
        try{
            axios.post(`http://localhost:5000/login`, {username, password})
            .then(response=>{
                console.log(response)
                if(!response.data.user){
                    console.log('Could not login')
                    navigate('/auth');
                }else{
                    login(response.data.user);
                    navigate('/dashboard');
                    
                }
            })
            .catch(error=>
                {
                    console.log(error)
                    showPopup({type: 'error', text: 'There was an error. Check your email or password and try again!', title:"Error"})
                    setLoginError(error)
                }
                )
        } catch (error){
            console.log(error)
        }
    }

   
    return ( 
        <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <label>Username</label>
                <input type="text" name="username" id="username" required={true} value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                <label>Password</label>
                <input type="password" name="password" id="password" required={true} value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="basic-button">Login</button>
        </form>
     );
}
 
export default Login;