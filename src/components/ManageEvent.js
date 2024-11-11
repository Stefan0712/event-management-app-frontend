import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../stylings/manageEvent.css';
import CreateList from "./CreateList";
import {formatDbDate} from "../functions";
import MobileNavbar from "./MobileNavbar";
import dateIcon from './icons/calendar.svg';
import participantsIcon from './icons/audience.svg';
import checkSquareIcon from './icons/tasks.svg';
import menuIcon from './icons/menu.svg';
import LoginError from "./LoginError";
import { useAuth } from "../contexts/AuthContext";
import editIcon from './icons/edit.svg'
import backArrow from './icons/back-arrow.svg'
import Navbar from './Navbar';
import startedIcon from './icons/started.svg';
import doorIcon from './icons/door.svg';
import eyeIcon from './icons/eye.svg';


const ManageEvent = () => {
    //id of the event
    const {id} = useParams()
    //data of the event
    const [eventData, setEventData] = useState(null)
    //state to show/hide create list modal
    const [showCreateListModal, setShowCreateListModal] = useState(false)
    //user data from auth context
    const {user} = useAuth();

    useEffect(()=>{
        try{
            axios.get(`http://localhost:5000/manage-event/${id}`)
            .then(response=>{
                setEventData(response.data)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    },[])

    const closeCreateListModal = () =>{
        setShowCreateListModal(false)
    }
    if(user){
        return ( 
            <div id="manage-event-page">
                {eventData !== null ? (<div className="page-title">
                    <Link className="back-button" to={`/view-event/${eventData._id}`}>
                        <img className="inverted-icon" src={backArrow} alt=""></img>
                    </Link>
                    <h2>Manage Event</h2>
                    <Link to={`/edit-event/${eventData._id}`}>
                        <img className="inverted-icon edit-btn" src={editIcon}></img>
                    </Link>
                    </div>
                    ) : (
                    <div className="page-title">Manage Event</div>
                    )
                    }
                {eventData ? (
                <div className="manage-event-dashboard">
                    <div className="first-half">
                        <div className="name">
                            <Link className="back-button" to={`/view-event/${eventData._id}`}>
                                <img className="inverted-icon" src={backArrow} alt=""></img>
                            </Link>
                            {eventData.name} 
                            <Link className="desktop-edit-button" to={`/edit-event/${eventData._id}`}>
                                <img className="inverted-icon edit-btn" src={editIcon}></img>
                            </Link>
                        </div>
                        <div className="flex-row"><div className="accent-bg"><img className="small-icon" src={dateIcon}></img></div> {formatDbDate(eventData.date)}</div>
                        <div className="flex-row"><div className="accent-bg"><img className="small-icon" src={participantsIcon}></img></div>{eventData.participants.length}/{eventData.maxParticipants}</div>
                        <div className="flex-row"><div className="accent-bg"><img className="small-icon" src={startedIcon}></img></div>{eventData.isStarted ? 'Started' : 'Not Started'}</div>
                        <div className="flex-row"><div className="accent-bg"><img className="small-icon" src={eyeIcon}></img></div>{eventData.isPublic ? "Public" : "Private"}</div>
                        <div className="flex-row"><div className="accent-bg"><img className=" small-icon" src={doorIcon}></img></div>{eventData.isOpen ? "Open" : "Closed"}</div>
                        
                        <div className="page-subheader">Lists </div>
                        {eventData.lists.length === 0 ? (<p>No lists yet</p>) : ("")}
                        {
                            eventData.lists.map((list,index)=>(
                                <Link className="list-body" to={`/view-list/${list._id}`} key={"listItem"+index}><p>{list.title}</p> <p className="tasks"><img src={checkSquareIcon} className="inverted-icon small-icon"></img> {list.tasks.filter((task)=>task.isCompleted).length}/{list.tasks.length}</p></Link>
                            ))
                        }
                        {showCreateListModal ? (
                            <div id="create-list-modal" data-bs-theme="dark" className={`${showCreateListModal ? "show-create-list-modal" : ""}`}>
                                <div className="modal-component-container">
                                    <CreateList eventId={eventData._id} closeCreateListModal={closeCreateListModal}/>
                                </div>
                            
                            </div>
                        ) : (
                            <button type="button" className="basic-button create-list-btn" onClick={()=>showCreateListModal ? setShowCreateListModal(false) : setShowCreateListModal(true)}>
                            Create a list
                            </button>
                        )}
                    </div>
                    <div className="second-half">
                        <div className="page-subheader">Participants</div>
                        <div className="manage-event-participants">
                            {eventData.participants.map((item, index)=>(
                                <div className="participant-body" key={"participant-item-"+index}>
                                    <div className="name">{item.username} </div>
                                    <div className="user-role">Guest</div>
                                    <img src={menuIcon} className="inverted-icon small-icon"></img>
                                </div>
                            ))}
                        </div>
                        {/* TODO: Implement an invitation system */}
                        {/* <button className="basic-button">Invite</button> */}
                    
                        
                        <div className="page-subheader">Schedule</div>
                                    
                            {eventData.schedule.length > 0 ? (
                                    <div className='schedule-container'>
                                    {eventData.schedule.map((item,index)=>(
                                        <div className='schedule-body' key={"schedule-item-"+index}>
                                            <strong>{item.start}</strong>
                                            <p>{item.name}</p>
                                        </div>
                                    ))}
                                    
                                </div>
                            ) : (
                            <h3>No Schedule</h3>
                            )}
                        
                        
                    </div>
                   

                        
                    
                </div>
                ) : (
                    <h1>Event loading</h1>
                )}
                <MobileNavbar />
            </div>
        );
    }else{
        return (
            <LoginError />
        )
    }
}
 
export default ManageEvent;