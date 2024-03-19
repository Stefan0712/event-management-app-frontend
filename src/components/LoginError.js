import { Link } from "react-router-dom";

const LoginError = () => {
    return ( 
        <div id="login-error-page">

            <p className="message">Please login first</p>
            <Link to={"/auth"} className="basic-button">Login</Link>

        </div>
     );
}
 
export default LoginError;