import {useEffect, useState, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import '../stylings/viewEvent.css'
import {formatDbDate, formatDateForEventBody} from '../functions';
import clockIcon from './icons/clock.svg';
import startedIcon from './icons/started.svg';
import notStartedIcon from './icons/not-started.svg';
import locationIcon from './icons/location-pin.svg';
import calendarIcon from './icons/calendar.svg';
import timeIcon from './icons/time.svg';
import shareIcon from './icons/share.svg';
import checkedBookmarkIcon from './icons/bookmark-checked.png';
import bookmarkIcon from './icons/bookmark.svg';
import mapMarkerIcon from './icons/map-marker.png';
import participantsIcon from './icons/audience.svg';
import placeholderImg from './icons/placeholder.jpg';
import starIcon from './icons/star.svg';
import { useAuth } from '../contexts/AuthContext';
import placeholderProfilePicture from './icons/profile-placeholder.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';



const ViewEvent = () => {

    //the id of the event shown
    const { id } = useParams();
    const customIcon = new Icon({
        iconUrl: mapMarkerIcon,
        iconSize: [38, 38]
    })
    //the data of the event
    const [eventData, setEventData] = useState(null)
    //state to keep track of which section is active between general, gallery and about
    const [activeSection, setActiveSection] = useState('general');
    //state to hold user data from the Auth Context
    const {user} = useAuth();
    const [formatedDate, setFormatedDate] = useState("")
    const [coordinates, setCoordinates] = useState([]);

    

    useEffect(()=>{
        
        try{
            axios.get(`http://192.168.1.11:5000/view-event/${id}`)
            .then(response=>{
                setEventData(response.data);
                setFormatedDate(formatDateForEventBody(response.data.date));
                console.log(response)
                getCoordinates(response.data.location.length > 0 && !response.data.eventCity ? response.data.location : response.data.eventCountry + ', ' + response.data.eventRegion + ', ' + response.data.eventCity);
                
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        
        
      
            
          
        
        
    },[user]);

    //location conversion to coordinates
    const getCoordinates = async (location) => {
        console.log("Get coordinates ran")
        try {
          const response = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${process.env.REACT_APP_LEAFLET_KEY}`);
          console.log(response)
          if (response.data && response.data.length > 0) {
            console.log(response.data[0].lat)
            const firstResult = response.data[0];
            setCoordinates([firstResult.lat, firstResult.lon]);
          }
        } catch (error) {
          console.log('Error fetching coordinates:', error);
        }
      };


    //functions that hold the logic for joining an event
    const handleJoinEvent = () =>{
        try{
            axios.post(`http://192.168.1.11:5000/join-event/${id}`, {userId: user._id})
            .then(response=>{
                //if successfully joined, then refresh the page to update the button 
                if(response.statusText==="OK"){
                    window.location.reload();
                }
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }

    const showSection = (section) => {
        setActiveSection(section);
      };

    const bookmarkEvent = () =>{
        try{
            axios.post(`http://192.168.1.11:5000/bookmark-event/${id}`, {userId: user._id})
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
    const unbookmarkEvent = () =>{
        console.log('removed bookmark')
        try{
            axios.post(`http://192.168.1.11:5000/unbookmark-event/${id}`, {userId: user._id})
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
        <div  id="view-event-page">
            
            <Navbar />
            <div className='view-event-outer-container'>
                <div className='page-title'>View Event</div>
                {eventData ? (
                    <div className='event-body'>
                        
                        <div className='event-header'>
                        <img className='view-event-image' src={placeholderImg}></img>
                            <div className='header-top'>
                                <div className='event-date'>
                                    <div className='date-text'>{formatedDate.day}, {formatedDate.month} {formatedDate.dayNumber}, {formatedDate.hours}:{formatedDate.minutes} {formatedDate.hours > 12 ? "PM" : "AM"}</div>
                                    <div className='event-header-buttons'>
                                       
                                        <div className='event-header-btn'>
                                            <img src={shareIcon} alt=''></img>
                                        </div>    
                                        <div className='event-header-btn'>
                                            {user.savedEvents && user.savedEvents.includes(id) ? (
                                                <img src={checkedBookmarkIcon} alt='' onClick={unbookmarkEvent}></img>

                                            ): (<img src={bookmarkIcon} alt='' onClick={bookmarkEvent}></img>)}
                                        </div>    
                                        
                                        
                                    </div>
                                </div>
                                <div className='event-name'>
                                    {eventData.name}
                                </div>
                            </div>
                            <div className='header-bottom'> 
                                <div className='view-event-buttons-container'>
                                    {/* checks if there is any use data. If yes, it renders either Join or Manage event, depending on if the user 
                                    created this event or is already a participant. If not, then it shows a button to go to the login page */}
                                    {user ? (
                                        eventData && eventData.author && eventData.participants ? (
                                            user._id === eventData.author._id || eventData.participants.includes(user._id) ? (
                                                <Link className='view-event-button' to={`/manage-event/${id}`}>Manage Event</Link>
                                            ) : (
                                                <button id='join-button' className='view-event-button' onClick={handleJoinEvent} disabled={!eventData.isOpen}>{eventData.isOpen ? "Request to Join" : "Joining is Closed"}</button>
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
                        <div className='tabs'>
                            <div className="tab-container">
                                <div className={`tab-button ${activeSection === 'general' && 'active'}`} onClick={() => showSection('general')}>General</div>
                                <div className={`tab-button ${activeSection === 'gallery' && 'active'}`} onClick={() => showSection('gallery')}>Map</div>
                                <div className={`tab-button ${activeSection === 'about' && 'active'}`} onClick={() => showSection('about')}>About</div>
                            </div>
                            <div className="tab-content">
                                <div className={`tab-section general ${activeSection === 'general' ? 'active' : ''}`}>
                                    <div className='section-row'>
                                        <div className='section-row-icon-container'>
                                            <img src={eventData.isStarted ? startedIcon : notStartedIcon} alt=''></img>
                                        </div>
                                        <div className='section-row-text'>
                                            <strong>Status:</strong>
                                            <p>{eventData.isStarted ? 'Started' : "Not Started"}</p>
                                        </div>
                                    </div>                                     

                                    <div className='section-row'>
                                        <div className='section-row-icon-container'>
                                            <img src={participantsIcon} alt=''></img>
                                        </div>
                                        <div className='section-row-text'>
                                            <strong>Participants:</strong>
                                            <p>{eventData.participants.length}/{eventData.maxParticipants}</p>
                                        </div>
                                    </div>    
                                    <div className='section-row'>
                                        <div className='section-row-icon-container'>
                                            <img src={timeIcon} alt=''></img>
                                        </div>
                                        <div className='section-row-text'>
                                            <strong>Duration:</strong>
                                            <p>{eventData.duration}</p>
                                        </div>
                                    </div>   
                                    <div className='section-row'>
                                        <div className='section-row-icon-container'>
                                            <img src={calendarIcon} alt=''></img>
                                        </div>
                                        <div className='section-row-text'>
                                            <strong>Date:</strong>
                                            <p>{formatDbDate(eventData.date)}</p>
                                        
                                        </div>
                                    </div>
                                    <div className='section-row'>
                                        <div className='section-row-icon-container'>
                                            <img src={clockIcon} alt=''></img>
                                        </div>
                                        <div className='section-row-text'>
                                            <strong>Time:</strong>
                                            <p>{formatDateForEventBody(eventData.date).hours}:{formatDateForEventBody(eventData.date).minutes}</p>
                                        
                                        </div>
                                    </div>
                                    <div className='section-row section-row-text'>
                                        <strong>Description:</strong>
                                        <p>{eventData.description}</p>
                                    </div>
                                    <div className='section-row section-row-text'>
                                        <strong>Requirements:</strong>
                                        <p>{eventData.requirements.length > 0 ? eventData.requirements : "No Requirements"}</p>
                                    </div>
                                    
                                </div>

                                <div className={`tab-section gallery ${activeSection === 'gallery' ? 'active' : ''}`}>

                                    <div className='section-row'>
                                            <div className='section-row-icon-container'>
                                                <img src={locationIcon} alt=''></img>
                                            </div>
                                            <div className='section-row-text'>
                                                <strong>Location:</strong>
                                                <p>{eventData.location}</p>
                                            
                                            </div>
                                    </div>
                                        {coordinates && coordinates.length > 0 ? (
                                            <div className='map-container'>
                                                    
                                                    <MapContainer center={coordinates} zoom={12}>
                                                        <TileLayer
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                                        />
                                                        <Marker position={coordinates} icon={customIcon}>
                                                            <Popup>
                                                                <p>{eventData.location}</p>
                                                            </Popup>
                                                        </Marker>
                                                    </MapContainer>
                                            </div>
                                        ) : (
                                            <div className='map'><h2>Map is loading. Coords: {coordinates}</h2></div>
                                        )}
                                        
                                </div>
                                <div className={`tab-section about ${activeSection === 'about' ? 'active' : ''}`}>
                                    <div className='organizer-body'>
                                        <img src={placeholderProfilePicture} className='organizer-profile-picture' alt=''></img>
                                        <div className='info'>
                                            <p>{eventData.author.username}</p>
                                            <p><img src={starIcon}></img> 4.7/5 (4 reviews)</p>
                                        </div>
                                    </div>
                                    <div className='section-header'>Schedule</div>
                                
                                        {eventData.schedule.length > 0 ? (
                                            <div className='schedule-container'>
                                                {eventData.schedule.map((item)=>(
                                                    <div className='schedule-item'>
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
                        </div>
                        
                    </div>
                ) : (
                    <h2>No data</h2>
                )}
            </div>
            
            <MobileNavbar />
        </div>
     );
}
 
export default ViewEvent;