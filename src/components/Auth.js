import { Link, useNavigate } from "react-router-dom";
import '../stylings/auth.css';
import Login from "./Login";
import Register from "./Register";
import { useState }  from 'react';


const Auth = () => {


    const [screenToShow, setScreenToShow] = useState('login');


    return ( 
        <div id="auth-page">
            <div className="auth-container">
                <h1 className="auth-logo">LOGO</h1>
                <img className="auth-img" src="./images/login-drawing.svg" alt=""></img>
                <div className="auth-options">
                    
                    <div className="buttons-container">
                        <button className={screenToShow === "login" ? 'selected-button' : ''} onClick={()=>setScreenToShow('login')}>Login</button>
                        <button className={screenToShow === "register" ? 'selected-button' : ''} onClick={()=>setScreenToShow('register')}>Register</button>
                    </div>
                    <div className="auth-form-container">
                        {screenToShow === "login" ? (
                            <Login />
                        ) : (
                            <Register />
                        )
                        }
                    </div>
                    <Link to='/#home'>Back</Link>
                </div>
                

            </div>
        </div>
     );
}
 
export default Auth;