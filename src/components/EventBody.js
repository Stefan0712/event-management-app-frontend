import { Link } from "react-router-dom";
import locationIcon from './icons/location-pin.svg';
import participantsIcon from './icons/audience.svg';
import { formatDateForEventBody } from '../functions';



const EventBody = ({item}) => {

    if(item) {
        return ( 
            <Link to={`/view-event/${item._id}`} className="event-body">
                        <div className="event-date">
                            <div className="background">
                            <div className="day">
                                {formatDateForEventBody(item.date).day}
                            </div>
                            <div className="day-number">
                                {formatDateForEventBody(item.date).dayNumber}
                            </div>
                            <div className="month">
                                {formatDateForEventBody(item.date).month}
                            </div>
                            </div>
                        </div>
                        <div className="event-info">
                            <div className="name">{item.name}</div>
                            <div className="location">
                                <img src={locationIcon} alt=""></img>
                                <p>{item.eventCity ? item.eventCity : item.location}</p>
                            </div>
                            <div className="participants">
                            <img src={participantsIcon} alt=""></img>
                            {item.participants.length}/{item.maxParticipants}
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