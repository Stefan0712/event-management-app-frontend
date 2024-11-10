import { Link } from "react-router-dom";
import '../stylings/navbar.css'
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {

    const {user} = useAuth();
    
    return ( 
        <nav id="desktop-nav">
            <div className="nav-logo">LOGO</div>
            <div className="nav-links">
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link to='/create-event'>Create Event</Link>
                    <Link to='/browse-events'>Browse Events</Link>
                    <Link to='/profile'>{ user ? user.username : 'Profile' }</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;