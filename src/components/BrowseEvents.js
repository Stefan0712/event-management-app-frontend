import '../stylings/BrowseEvents.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {formatDateForEventBody} from '../functions';
import MobileNavbar from './MobileNavbar.js';
import locationIcon from './icons/location-pin.svg';
import participantsIcon from './icons/audience.svg';
import Navbar from './Navbar';
import placeholder from './icons/placeholder.jpg'
import { useAuth } from '../contexts/AuthContext';
import starIcon from './icons/star.svg';
import checkedStarIcon from './icons/checked-star.png';


const BrowseEvents = () => {

    const [events, setEvents] = useState(null)
    const [topEvents, setTopEvents] = useState([])
    const {user} = useAuth();
    
    useEffect(() => {
        axios.get('http://event-management-app-backend-production.up.railway.app/events')
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
            axios.post(`http://event-management-app-backend-production.up.railway.app/bookmark-event/${id}`, {userId: user._id})
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
            axios.post(`http://event-management-app-backend-production.up.railway.app/unbookmark-event/${id}`, {userId: user._id})
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

    return ( 
        
            <div id="browse-events-page">
                    <Navbar />
                    <div className='page-title'>Browse Events</div>

                    <div className='events-container'>
                                {events ? (
                                    topEvents.map((item, index)=>(
                                        
                                        <Link to={`/view-event/${item._id}`} className='top-event-body' key={`event-key-${index}`}>
                                            <img src={placeholder} alt='' className='top-event-image'></img>
                                            <div className='event-info'>
                                                <div className='event-body-top'>
                                                    <div className='event-meta'>
                                                        <div className='event-date-row'>{formatDateForEventBody(item.date).day}, {formatDateForEventBody(item.date).month}</div>
                                                        <div className='name'>{item.name}</div>
                                                    </div>
                                                    <div className='event-body-bookmark-container'>
                                                        {user.savedEvents && user.savedEvents.includes(item._id) ? (
                                                        <img src={checkedStarIcon} alt='' onClick={()=>unbookmarkEvent(item._id)}></img>

                                                        ): (<img src={starIcon} alt='' onClick={()=>bookmarkEvent(item._id)}></img>)}
                                                    </div>
                                                </div>
                                                <div className='browse-event-footer'>
                                                    <div className='location'><img className='small-icon' src={locationIcon} alt=''></img>{item.location}</div>
                                                    <div className='participants'><img className='small-icon' src={participantsIcon} alt=''></img>{item.currentParticipants}/{item.maxParticipants}</div>
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