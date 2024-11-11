import '../stylings/BrowseEvents.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {formatDateForEventBody, formatDateForEventList} from '../functions';
import MobileNavbar from './MobileNavbar.js';
import locationIcon from './icons/location-pin.svg';
import participantsIcon from './icons/audience.svg';
import Navbar from './Navbar';
import placeholder from './icons/placeholder.jpg'
import { useAuth } from '../contexts/AuthContext';
import heart from './icons/heart.svg';
import filledHeart from './icons/heart-filled.svg';


const BrowseEvents = () => {

    const [events, setEvents] = useState(null)
    const [topEvents, setTopEvents] = useState([])
    const {user} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:5000/events')
          .then(response => {
            console.log(response)
            const events = response.data;
            const filteredEvents = events.filter((event)=>event.isPublic===true)
            console.log(response.data)
            console.log(filteredEvents)
            setEvents(filteredEvents); 
            const top = filteredEvents.sort((a, b) => b.participants.length - a.participants.length);
            setTopEvents(top.slice(0, 5))
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }, []); 


      const bookmarkEvent = (id) =>{
        try{
            axios.post(`http://localhost:5000/bookmark-event/${id}`, {userId: user._id})
            .then(response=>{
                // if successfully joined, then refresh the page to update the button 
                if(response.statusText==="OK"){
                    window.location.reload();
                }
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }
    const unbookmarkEvent = (id) =>{
        console.log('removed bookmark')
        try{
            axios.post(`http://localhost:5000/unbookmark-event/${id}`, {userId: user._id})
            .then(response=>{
                // if successfully joined, then refresh the page to update the button 
                if(response.statusText==="OK"){
                    window.location.reload();
                }
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }
    const handleJoinEvent = (eventId) =>{
        try{
            axios.post(`http://localhost:5000/join-event/${eventId}`, {userId: user._id})
            .then(response=>{
                //if successfully joined, then refresh the page to update the button 
                if(response.statusText==="OK"){
                   navigate(`/view-event/${eventId}`)
                }
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }
    return ( 
        
            <div id="browse-events-page">
                    <div className='page-title'>Browse Events</div>

                    <div className='events-container'>
                                {events ? (
                                    events.map((item, index)=>(
                                        
                                        <Link to={`/view-event/${item._id}`} className='event-body' key={`event-key-${index}`}>
                                            {console.log('event:',item)}
                                            <img src={placeholder} alt='' className='event-body-image'></img>
                                            <div className='bookmark'>
                                                {user.savedEvents && user.savedEvents.includes(item._id) ? (
                                                <img className='small-icon' src={filledHeart} alt='' onClick={()=>unbookmarkEvent(item._id)}></img>

                                                ): (<img className='small-icon' src={heart} alt='' onClick={()=>bookmarkEvent(item._id)}></img>)}
                                            </div>
                                            
                                            <div className='event-info'>
                                                <p className='event-title'>{item.name}</p>
                                                    
                                                    <div className='event-date'>
                                                        <p className='event-day'>{formatDateForEventList(item.date).day}</p>
                                                        <p className='event-month'>{formatDateForEventList(item.date).month}</p>
                                                    </div>
                                                <div className='joining-container'>
                                                    <div className='event-location'><img className='inverted-icon small-icon' src={locationIcon} alt=''></img>{item.location}</div>
                                                    <div className='event-members'>
                                                        <img className='inverted-icon small-icon' src={participantsIcon} alt=''></img>{item.participants.length}/{item.maxParticipants}
                                                    </div>
                                                    <div className='joining-button'>
                                                    {user ? (
                                                        item && item.author && item.participants ? (
                                                            user._id === item.author._id || item.participants.includes(user._id) ? (
                                                                <Link className='view-event-button' to={`/manage-event/${item._id}`}>Manage</Link>
                                                            ) : (
                                                                <button id='join-button' className='view-event-button' onClick={()=>handleJoinEvent(item.id)} disabled={!item.isOpen}>{item.isOpen ? "Join" : "Closed"}</button>
                                                            )
                                                        ) : (
                                                            <div>Event data is incomplete</div>
                                                        )
                                                    ) : (
                                                        <Link to={'/auth'} className='basic-button'>Login to join</Link>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            
                                        </Link>
                                        
                                    ))
                                ) : (<p>No events found</p>)}
                    
                    </div>
                    
                <MobileNavbar />
            </div>

       
     );
}
 
export default BrowseEvents;