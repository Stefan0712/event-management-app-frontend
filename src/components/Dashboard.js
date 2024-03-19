import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

import '../stylings/dashboard.css';


import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import LoginError from './LoginError';
import EventBody from './EventBody';
import { formatDbDate } from '../functions';

import plusIcon from './icons/plus.svg';


const Dashboard = () => {
  // Get the user from the AuthContext
  const { user } = useAuth();

  // Handles user's events
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [userTasks, setUserTasks] = useState([])

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if(user){
      try {
        axios
          .get(`http://192.168.1.11:5000/${user._id}/events`)
          .then((response) => {
            const data = response.data;
            setCreatedEvents(data.createdEvents);
            setJoinedEvents(data.joinedEvents);
            setBookmarkedEvents(data.bookmarkedEvents);
            
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
      try {
        axios
          .get(`http://192.168.1.11:5000/task/userTasks/${user._id}/`)
          .then((response) => {
            const tasks = response.data;
            setUserTasks(tasks);
            
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
    
  }, [user]);


  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Show an error page with a button that sends the user to the login page if not logged in
  if (!user) {
    return <LoginError />;
  } else {
    return (
      <div id="dashboard-page">
        <Navbar />
        <h1 className="page-title">Dashboard</h1>
        <div className="dashboard">
          <div className="calendar-container">
            <Calendar
              onChange={onChange}
              value={date}
             
            />
          </div>
          <div className="events-container">
          <Link to="/create-event" className="basic-button dashboard-button"><img src={plusIcon} alt='new event button'></img><p>Create Event</p></Link>
                <h2 className="page-subheader">Created Events</h2>
                {createdEvents && createdEvents.length > 0 ? (
                createdEvents.map((item) => (
                    <EventBody item={item} key={`${item.name}`} />
                ))
                ) : (
                <h2>No created events found!</h2>
                )}
                <h2 className="page-subheader">Joined Events</h2>
                {joinedEvents && joinedEvents.length > 0 ? (
                joinedEvents.map((item) => (
                    <EventBody item={item} key={`${item.name}`} />
                ))
                ) : (
                <h2>No created events found!</h2>
                )}
                <h2 className="page-subheader">Bookmarked Events</h2>
                {bookmarkedEvents && bookmarkedEvents.length > 0 ? (
                bookmarkedEvents.map((item) => (
                    <EventBody item={item} key={`${item.name}`} />
                ))
                ) : (
                <h2>No created events found!</h2>
                )}
                
            </div>
          
            <div className='tasks-container'>
                    <div className='page-subheader'>My Tasks</div>
                    {userTasks && userTasks.length > 0 ? (
                      userTasks.map((item, index)=>(
                        <Link to={`/view-list/${item.listId}`} className='dashboard-task-body task-link' key={"dashboard-task"+index}>
                          <div className={`task-priority ${item.priority}-priority-tag`}>{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}</div>
                          <p className='task-name'>{item.name}</p>
                          <p className='task-dueDate'>{item.deadline ? (formatDbDate(item.deadline)) : (<p>No date</p>)}</p>
                      </Link>
                      ))
                    ) : (
                      <p>No Tasks</p>
                    )}
                    
                    
            </div>
        </div>
        <MobileNavbar />
      </div>
    );
  }
};

export default Dashboard;
