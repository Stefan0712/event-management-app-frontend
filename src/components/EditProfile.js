import { useAuth } from "../contexts/AuthContext"; 
import { useState, useEffect } from "react";
import '../stylings/editProfile.css';
import MobileNavbar from ".//MobileNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const EditProfile = () => {

    const {user} = useAuth();
    const [userData, setUserData] = useState();
    const navigate = useNavigate(); 

    useEffect(()=>{
        setUserData(user);
    },[])
  

    const handleUpdate = (e, field) =>{
        const temp = { ...userData };
        let value;
        if(e.target.value === "true"){
            value = true;
        }else if(e.target.value === "false"){
            value = false;
        }else{
            value = e.target.value;
        }
        temp[field] = value;
        setUserData(temp);

        localStorage.setItem('user', JSON.stringify(temp));


        console.log(temp);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{

            const response = await axios.post(`http://event-management-app-backend-production.up.railway.app/edit-profile/${user._id}`, userData)
            console.log(response)
            
            navigate(`/profile`);
            
        } catch(error){
            console.error(error)
        }
    }
    return ( 
        <div id="edit-profile-page">
            <div className="page-title">Edit Profile</div>
            <div className="edit-profile-body">
                {userData ? (
                    <form>
                    <label>Username</label>
                    <input type="text" value={userData.username} name="username" onChange={(e)=>handleUpdate(e,'username')}></input>
                    <label>Bio</label>
                    <input type="text" value={userData.bio} name="bio" onChange={(e)=>handleUpdate(e,'bio')}></input>
                    <label>Profile visibility</label>
                    <select name="profileVisibility" value={userData.profileVisibility} onChange={(e)=>handleUpdate(e,'profileVisibility')}>
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                    </select>
                    <label>Joined Events Visibility</label>
                    <select name="joinedEventsVisibility"  value={userData.joinedEventsVisibility} onChange={(e)=>handleUpdate(e,'joinedEventsVisibility')}>
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                    </select>
                    <label>Created Events Visibility</label>
                    <select name="createdEventsVisibility" value={userData.createdEventsVisibility}  onChange={(e)=>handleUpdate(e,'createdEventsVisibility')}>
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                    </select>
                    <button className="basic-button" onClick={handleSubmit}>Update Profile</button>
                </form>
                ) : (
                    <h1>Loading...</h1>
                )}
                
            </div>
            <MobileNavbar />
        </div>
     );
}
 
export default EditProfile;