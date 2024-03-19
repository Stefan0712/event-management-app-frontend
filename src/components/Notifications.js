import '../stylings/notifications.css';
import MobileNav from './/MobileNavbar';
import deleteNotificationIcon from './icons/delete-notification.svg'


const Notifications = () => {
    return ( 
        <div id="notifications-page">
            <div className="page-title">Notifications</div>
            <div className="notifications-container">
                <div className="notification-body">
                    <div className="notification-message"><a href='#'>Shopping list</a> was updated for <a href='#'>Birthday Party</a></div>
                    <div className="notification-delete"><img src={deleteNotificationIcon} alt=''></img></div>
                </div>
                <div className="notification-body">
                    <div className="notification-message"><a href='#'>Shopping list</a> was updated for <a href='#'>Birthday Party</a></div>
                    <div className="notification-delete"><img src={deleteNotificationIcon} alt=''></img></div>
                </div>
                <div className="notification-body">
                    <div className="notification-message"><a href='#'>Shopping list</a> was updated for <a href='#'>Birthday Party</a></div>
                    <div className="notification-delete"><img src={deleteNotificationIcon} alt=''></img></div>
                </div>
                <button className='basic-button'>Delete All</button>    
            </div>

            <MobileNav />
        </div>
     );
}
 
export default Notifications;