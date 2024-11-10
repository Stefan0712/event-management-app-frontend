import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

import '../stylings/dashboard.css';


import MobileNavbar from './MobileNavbar';
import LoginError from './LoginError';
import EventBody from './EventBody';
import { daysUntil, formatDbDate } from '../functions';

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
          .get(`http://localhost:5000/${user._id}/events`)
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
          .get(`http://localhost:5000/task/userTasks/${user._id}/`)
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
        
        <h1 className="page-title">Dashboard</h1>
        <div className="dashboard">
          {console.log('User data',user)}
          <div className='dashboard-summary'>
            <h4 className='category-title'>Summary</h4>
            <div className='summary-block'>
              <div className='summary-title'>Upcoming Events</div>
              <div className='summary-value'>{joinedEvents?.filter((event)=>daysUntil(event.date) >= 0).length + createdEvents?.filter((event)=>daysUntil(event.date) >= 0).length}</div>
            </div>
            <div className='summary-block'>
              <div className='summary-title'>Assigned Tasks</div>
              <div className='summary-value'>{userTasks?.length}</div>
            </div>
            <div className='summary-block'>
              <div className='summary-title'>Friends</div>
              <div className='summary-value'>{user?.frields?.length || 0}</div>
            </div>
            <div className='summary-block'>
              <div className='summary-title'>Posts</div>
              <div className='summary-value'>{user?.posts?.length || 0}</div>
            </div>
          </div>
          <div className="events-container">
              <Link to="/create-event" className="basic-button dashboard-button"><img className='medium-icon' src={plusIcon} alt='new event button'></img><p>Create Event</p></Link>
              <h4 className="category-title">Upcoming Events</h4>
              {createdEvents?.length > 0 ? (
              createdEvents.map((item) => daysUntil(item.date) >= 0 ? (
                  <EventBody item={item} key={`${item.name}`} />
              ) : '')
              ) : ''}
              {joinedEvents?.length > 0 ? (
              joinedEvents.map((item) => daysUntil(item.date) >= 0 ? (
                  <EventBody item={item} key={`${item.name}`} />
              ) : '')
              ) : ''}
              {joinedEvents?.length === 0 && createdEvents?.length === 0 ? (<h4>No events found!</h4>) : ''}
              <h4 className="category-title">Past Events</h4>
              {createdEvents?.length > 0 ? (
              createdEvents.map((item) => daysUntil(item.date) < 0 ? (
                  <EventBody item={item} key={`${item.name}`} />
              ) : '')
              ) : ''}
              {joinedEvents?.length > 0 ? (
              joinedEvents.map((item) => daysUntil(item.date) < 0 ? (
                  <EventBody item={item} key={`${item.name}`} />
              ) : '')
              ) : ''}
            </div>
          
            <div className='tasks-container'>
                    <h4 className='category-title'>My Tasks</h4>
                    {userTasks?.length > 0 ? (
                      userTasks?.map((item, index)=>(
                        <Link to={`/view-list/${item.listId}`} className='dashboard-task-body task-link' key={"dashboard-task"+index}>
                          <div className={`task-priority ${item.priority}-priority-tag`}></div>
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
