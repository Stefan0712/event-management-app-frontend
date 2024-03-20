import { Link, useNavigate } from "react-router-dom";
import '../stylings/auth.css';
import Login from "./Login";
import Register from "./Register";
import { useState }  from 'react';
import wavesBg from './icons/waves.svg'
import backArrowIcon from './icons/back-arrow.svg';


const Auth = () => {


    const [screenToShow, setScreenToShow] = useState('login');


    return ( 
        <div id="auth-page" style={{'backgroundImage': `url(${wavesBg})`}}>
            <div className="auth-container" >
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
                    <Link to='/#home' className="login-back-btn"><img className="back-btn-icon" src={backArrowIcon} alt="back to landing page button"></img></Link>
                </div>
                

            </div>
        </div>
     );
}
 
export default Auth;