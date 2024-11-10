import { Link } from "react-router-dom";
import locationIcon from './icons/location-pin.svg';
import durationIcon from './icons/clock.svg';
import participantsIcon from './icons/audience.svg';
import { daysUntil, formatDateForEventBody } from '../functions';



const EventBody = ({item}) => {

    if(item) {
        return ( 
            <Link to={`/view-event/${item._id}`} className="event-body">
                        <div className="event-date">
                            <div className="day">
                                {formatDateForEventBody(item.date).dayNumber}
                            </div>
                            <div className="month">
                                {formatDateForEventBody(item.date).month}
                            </div>
                        </div>
                        {console.log(item)}
                        <div className="event-info">
                            <div className="name">{item.name}</div>
                            <div className="event-meta">
                                <div className="location">
                                    <img className="small-icon" src={locationIcon} alt=""></img>
                                    <p>{item.eventCity ? item.eventCity : item.location}</p>
                                </div>
                                <div className="participants">
                                    <img className="small-icon" src={participantsIcon} alt=""></img>
                                    {item.participants.length}/{item.maxParticipants}
                                </div>
                                <div className="participants">
                                    <img className="small-icon" src={durationIcon} alt=""></img>
                                    {item.duration}
                                </div>
                                <div className="days-left">
                                    {daysUntil(item.date) >= 0 ? (<p>{daysUntil(item.date)} days left</p>)
                                    : 
                                    (<p>{daysUntil(item.date)*-1} ago</p>)
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        </Link>
         );
    } else{
        return (
            <h1>Loading Event</h1>
        )
    }
    
}
 
export default EventBody;