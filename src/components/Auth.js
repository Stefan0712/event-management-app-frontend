import { Link, useNavigate } from "react-router-dom";
import '../stylings/auth.css';
import Login from "./Login";
import Register from "./Register";
import { useState }  from 'react';
import wavesBg from './icons/waves.svg'
import backArrowIcon from './icons/back-arrow.svg';
import Popup from "./Popup";


const Auth = () => {


    const [screenToShow, setScreenToShow] = useState('login');
    const [screenPopup, setScreenPopup] = useState(null)

    const switchToLogin = () =>{
        setScreenToShow('login')
        setScreenPopup(<Popup msg={{type: "success", title: "Register Successful", text: "You have registered successfully"}}  />)
        setTimeout(()=>{
            setScreenPopup(null)
        },4950)
    }
    const showPopup = (msg) =>{
        setScreenPopup(<Popup msg={msg}  />)
        setTimeout(()=>{
            setScreenPopup(null)
        },4950)
    }
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
                            <Login showPopup={showPopup} />
                        ) : (
                            <Register switchToLogin={switchToLogin}/>
                        )
                        }
                    </div>
                    {screenPopup}
                    <Link to='/#home' className="login-back-btn"><img className="back-btn-icon" src={backArrowIcon} alt="back to landing page button"></img></Link>
                </div>
                

            </div>
        </div>
     );
}
 
export default Auth;