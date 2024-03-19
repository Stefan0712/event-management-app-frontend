import { useState } from 'react';
import '../stylings/createEvent.css'
import axios from 'axios';
import MobileNavbar from './MobileNavbar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';



const CreateEvent = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        author: null,
        description: 'No description set up but it will probably be fun.',
        date: new Date(),
        duration: '',
        location: "",
        eventCountry: "",
        eventRegion: "",
        eventCity: "",
        minParticipants: 1,
        maxParticipants: 100,
        requirements: '',
        schedule: [],
        rules:[]
    })
   
    const [scheduleInput, setScheduleInput] = useState({name:"",start:'', end:''});
    const [schedules, setSchedules] = useState([])
    const [rules, setRules] = useState([])
    const [rule, setRule] = useState({name: ""})

    //schedule logic
    //function to handle changes on the inputs
    const handleScheduleInputChange = (e, field) => {
        //gets the value of schedule state. It will follow the structure I provided and update it.
        let tempSchedule = {...scheduleInput};
        //updates the corresponding property
        tempSchedule[field] = e.target.value;
        //updates the state
        setScheduleInput(tempSchedule);
    };
    //function that adds the whole completed schedule to the event data
    const addSchedule = (e) =>{
        e.preventDefault();
        //adds created schedule to a client-side array of schedules used as preview
        setSchedules((schedules)=>[...schedules, scheduleInput]);
        //created a function scope temp version of the form data
        const updatedEvent = formData;
        //gets the existing schedules from the form data
        const scheduleArray = updatedEvent.schedule;
        //pushes the new schedule to the array
        scheduleArray.push(scheduleInput);
        //updated the form data schedules array to the new schedules array
        updatedEvent.schedule = scheduleArray;
        //updates the form data state
        setFormData(updatedEvent);
        //resets the schedule object I provided
        setScheduleInput({name:"",start:'', end:''});
    }
    //end of schedule


    const handleSubmit = async (event) =>{
        event.preventDefault();
        //clone form data state
        const data = formData;
        //adds the current user as author
        data.author = user._id;
        //sends the data to the backend
        try{

            const response = await axios.post('https://event-management-app-backend-production.up.railway.app/create-event', data);
            if(response.data){
                console.log(response.data)
                navigate(`/view-event/${response.data._id}`);
            }

        } catch(error){
            console.error(error)
        }

    }

    const handleInputChange = (event) =>{
        let temp = formData;
        temp[event.target.name] = event.target.value;
        setFormData(temp);
    }
    const handleRuleChange = (e) =>{
        e.preventDefault();
        setRule({name: e.target.value});
        
    }
   
    const addRule = (e) =>{
        e.preventDefault();
        //adds the new rule to the client-side rules array
        setRules((rules)=>[...rules, rule])
        //clone the form data state
        const updatedEvent = formData;
        //gets the rules array from form data
        const tempRules = updatedEvent.rules;
        //pushes the new rule to the array
        tempRules.push(rule);
        //updates the form data array with the new version
        updatedEvent.rules = tempRules;
        //updates the state with the new rules array
        setFormData(updatedEvent);
        //resets rule state
        setRule({name: ""})
    }
   
    if(user){
            return ( 
                
                <div id="create-event-page">
                    <Navbar />
                    <div className='page-title'>Create a new event</div>
                    <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Event Name</label>
                                <input type='text' className='form-control' name='name' onChange={handleInputChange}></input>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Description</label>
                                    <input type='text' className='form-control' name='description' onChange={handleInputChange}></input>
                            </div>
                            <div className='mb-3 row'>
                                <div className='col-6'>
                                    <label className='form-label'>Duration</label>
                                    <input type='text' className='form-control' name='duration' onChange={handleInputChange}></input>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Date</label>
                                    <input type='date' className='form-control' name='date' onChange={handleInputChange}></input>
                                </div>
                            </div>
                
                            <div className='mb-3'>
                                <label className='form-label'>Location</label>
                                <input type='text' className='form-control' name='eventCountry' onChange={handleInputChange} placeholder='Country'></input>
                                <input type='text' className='form-control' name='eventRegion' onChange={handleInputChange} placeholder='Region/State'></input>
                                <input type='text' className='form-control' name='eventCity' onChange={handleInputChange} placeholder='City'></input>
                            </div>
                            <div className='mb-3 participants-inputs'>
                                <div className='participants-input'>
                                    <label className='form-label'>Minimum participants</label>
                                    <input type='number' className='form-control' name='minParticipants' onChange={handleInputChange}></input>
                                </div>
                                <div className='participants-input'>
                                    <label className='form-label'>Maximum participants</label>
                                    <input type='number' className='form-control' name='maxParticipants' onChange={handleInputChange}></input>
                                </div>
                            
                                
                            </div>
                        
                            <div className='mb-3'>
                                <label className='form-label'>Requirements</label>
                                <input type='text' className='form-control' name='requirements' onChange={handleInputChange}></input>
                            </div>
                            <div className='mb-3 schedule-section'>
                                <label className='form-label page-subheader'>Schedule</label>
                                <div className='schedule-container'>
                                    {schedules.length > 0 ? (
                                        
                                            schedules.map((item)=>
                                            (
                                            <div className='schedule-body'>
                                                <strong>{item.start} - {item.end}</strong> 
                                                <p>{item.name}</p>
                                            </div>
                                            )
                                        )
                                    
                                    ) : (
                                        <h2>No schedules yet</h2>
                                    )}
                                </div>
                                <div className='schedule-form'>
                                    <div className='schedule-inputs'>
                                        <input type='text' className='name' name='name' value={scheduleInput.name} onChange={(e)=>handleScheduleInputChange(e, 'name')} placeholder='Name'></input>
                                        <div className='hours'>
                                            <input type='time' className='start-hour' name='start' value={scheduleInput.start} onChange={(e)=>handleScheduleInputChange(e, 'start')} placeholder='Start'></input>
                                            <input type='time' className='end-hour' name='end' value={scheduleInput.end} onChange={(e)=>handleScheduleInputChange(e, 'end')} placeholder='End'></input>
                                        </div>
                                    </div>
                                    <button className='basic-button' onClick={addSchedule}>Add</button>
                                </div>
                            </div>
                                {/*add rules section */}
                                <div className='mb-3 schedule-section'>
                                    <label className='page-subheader'>Rules</label>
                                    <div className='schedule-container'>
                                        {rules.length > 0 ? (
                                            
                                                rules.map((item,index)=>
                                                (
                                                <div className='schedule-body' key={`rule${index}`}>
                                                    <strong>{index+1}</strong> 
                                                    <p>{item.name}</p>
                                                </div>
                                                )
                                            )
                                        
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    
                                    <div className='rules-form'>
                                        <input className='form-control rule-input' name='name' value={rule.name} onChange={(e)=>handleRuleChange(e)} placeholder='Rule'></input>
                                        <button className='basic-button' onClick={addRule}>Add</button>
                                    </div>
                                    {/*add rules section end */}
                                </div>
                                <div className='button-container'>
                                    <button type='submit' className='basic-button'>Create Event</button>
                                </div>
                    </form>
                    <MobileNavbar />
                </div>
            );
    } else{
        return (
            <h1>Loading...</h1>
        )
    }
}
 
export default CreateEvent;