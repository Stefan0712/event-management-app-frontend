import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Contact from './components/Contact';
import About from './components/About';
import Dashboard from './components/Dashboard';
import BrowseEvents from './components/BrowseEvents';
import CreateEvent from './components/CreateEvent';
import Profile from './components/Profile'
import EditEvent from './components/EditEvent';
import ManageEvent from './components/ManageEvent';
import ViewEvent from './components/ViewEvent';
import ViewList from './components/ViewList';
import Notifications from './components/Notifications';
import { AuthProvider } from './contexts/AuthContext';
import EditProfile from './components/EditProfile';
import Social from './components/Social';
import Post from './components/Post';


function App() {
  return (
    <div className="App">
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='auth' element={<Auth />} />
              <Route path='contact' element={<Contact />} />
              <Route path='about' element={<About />} />
              <Route path='profile' element={<Profile />} />
              <Route path='browse-events' element={<BrowseEvents />} />
              <Route path='view-event/:id' element={<ViewEvent />} />
              <Route path='create-event' element={<CreateEvent />} />
              <Route path='edit-event/:id' element={<EditEvent />} />
              <Route path='manage-event/:id' element={<ManageEvent />} />
              <Route path='browse-events' element={<BrowseEvents />} />
              <Route path='view-list/:id' element={<ViewList />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='notifications' element={<Notifications />} />
              <Route path='edit-profile/:id' element={<EditProfile />} />
              <Route path='social' element={<Social />} />
              <Route path='post/:id' element={<Post />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

