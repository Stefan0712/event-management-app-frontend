import { Link } from "react-router-dom";
import '../stylings/navbar.css'
import dashboardIcon from './icons/dashboard.svg'
import browseIcon from './icons/browse.svg'
import profileIcon from './icons/profile.svg'
import notificationIcon from './icons/notification.svg'

const MobileNavbar = () => {

   
    return ( 
        <nav className="mb-3" id="mobile-nav">
            <div className="nav-links">
                    <Link to='/dashboard'>
                        <img src={dashboardIcon}></img>
                        <p>Dashboard</p>
                    </Link>
                    <Link to='/browse-events'>
                        <img src={browseIcon}></img>
                        <p>Browse</p>
                    </Link>
                    <Link to='/profile'>
                        <img src={profileIcon}></img>
                        <p>Profile</p>
                    </Link>
                    <Link to='/social'>
                        <img src={notificationIcon}></img>
                        <p>Social</p>
                    </Link>
            </div>
        </nav>
     );
}
 
export default MobileNavbar;