import Navbar from ".//Navbar";
import MobileNavbar from ".//MobileNavbar";
import { useAuth } from "../contexts/AuthContext";
import '../stylings/profile.css';
import { Link, useNavigate } from "react-router-dom";
import placeholder from './icons/profile-placeholder.png';
import editIcon from './icons/edit.svg';
import EventBody from ".//EventBody";
import { useEffect } from "react";
import wavesBg from './icons/waves.svg'

const Profile = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(user)
    },[user])

    const handleLogout = () =>{
        logout();
        navigate('/auth');
    }
    return ( 
        <div id="profile-page">
            <Navbar />
            <div className="page-title">Profile</div>
            {user ? (<div className="profile-container">
                <div className="profile-top" style={{'backgroundImage': `url(${wavesBg})`}}>
                    <img className="profile-picture" src={placeholder} alt=""></img>
                    <h3 className="username">{user.username}</h3>
                    <div className="profile-top-row">
                        <div className="profile-column">
                            <p className="profile-label">Rating</p>
                            <p className="profile-info">5/5 (1 rating)</p>
                        </div>
                        <div className="profile-column">
                            <p className="profile-label">Location</p>
                            <p className="profile-info">Unknown</p>
                        </div>
                        <div className="profile-column">
                            <p className="profile-label">Friends</p>
                            <p className="profile-info">0</p>
                        </div>
                        
                    </div>
                    <div className="profile-row">
                        <p className="profile-label">Bio:</p>
                        <p className="profile-info">{user.bio}</p>
                    </div>
                    <div className="profile-row">
                        <p className="profile-label">Attended Events</p>
                        <p className="profile-info">{user.joinedEvents.length}</p>
                    </div>
                    <div className="profile-row">
                        <p className="profile-label">Created Events</p>
                        <p className="profile-info">{user.createdEvents.length}</p>
                    </div>

                </div>
                

                <div className="attending-events-container">
                    <div className="page-subheader">Attening Events</div>
                    {user.joinedEventsVisibility ? (
                        user.createdEvents.length > 0 ? (
                            user.joinedEvents.map((item) => (
                            <EventBody item={item} />
                        ))
                        ) : (
                            <h2>No created events found!</h2>
                        )
                    ) : (
                        <p>This list is private.</p>
                    )}
                    
                </div>
                <div className="created-events-container">
                    <div className="page-subheader">Created Events</div>
                    {user.createdEventsVisibility ? (
                    user.createdEvents.length > 0 ? (
                        user.createdEvents.map((item) => (
                        <EventBody item={item} />
                    ))
                    ) : (
                        <h2>No created events found!</h2>
                    )
                    ) : (
                        <p>This list is private.</p>
                    )}
                </div>
                
               
                <div className="profile-buttons">
                    <button className="basic-button profile-logout-button" onClick={handleLogout}>Logout</button>

                    <Link to={`/edit-profile/${user._id}`} className="basic-button">
                        <img src={editIcon} alt="" className="small-icon"></img>
                        <p>Edit Profile</p>
                    </Link>
                </div>
                
            </div>) : (
                <h1>Please <Link to={'/auth'}>log in</Link> first</h1>
            )}
            
            <MobileNavbar />
        </div>
        
     );
}
 
export default Profile;