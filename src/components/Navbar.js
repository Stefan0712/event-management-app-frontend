import { Link } from "react-router-dom";
import '../stylings/navbar.css'
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {

    const {user} = useAuth();
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    return ( 
        <nav id="desktop-nav" className={`${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo">LOGO</div>
            <div className="nav-links">
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link to='/create-event'>Create Event</Link>
                    <Link to='/browse-events'>Browse Events</Link>
                    <Link to='/profile'>{ user ? user.username : 'Profile' }</Link>
                    <Link to='/social'><p>Social</p></Link>
            </div>
        </nav>
     );
}
 
export default Navbar;