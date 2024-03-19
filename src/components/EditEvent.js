import '../stylings/editEvent.css'
import axios from 'axios';
import {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import backArrow from './icons/back-arrow.svg';
import removeIcon from './icons/close.svg';


const EditEvent = () => {

    const {id} = useParams();
    const [eventData, setEventData] = useState({});
    const [dataToSend, setDataToSend] = useState()
    const [scheduleInput, setScheduleInput] = useState({name:"",start:'', end:''});
    const [schedules, setSchedules] = useState([]);
    const [rules, setRules] = useState([]);
    const [rule, setRule] = useState({name: ""});
    const navigate = useNavigate();

    useEffect(()=>{
        try{
            axios.get(`http://event-management-app-backend.railway.internal/manage-event/${id}`)
            .then(response=>{
                setEventData(response.data)
                setSchedules(response.data.schedule)
                setRules(response.data.rules)
                console.log(response.data)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    },[])


    //schedule login
    const handleScheduleInputChange = (e, field) => {
        let tempSchedule = {...scheduleInput};
        tempSchedule[field] = e.target.value;
        setScheduleInput(tempSchedule);
    };
    const addSchedule = (e) =>{
        e.preventDefault();
        console.log(scheduleInput)
        setSchedules((schedules)=>[...schedules, scheduleInput]);
        const updatedEvent = eventData;
        const scheduleArray = updatedEvent.schedule;
        scheduleArray.push(scheduleInput);
        updatedEvent.schedule = scheduleArray;
        setEventData(updatedEvent);
        setScheduleInput({name:"",start:'', end:''});
    }
    const removeSchedule = (index) =>{
        console.log(index);
        const tempSchedules = [...schedules]; // Create a copy of schedules array
        tempSchedules.splice(index, 1);
        setSchedules(tempSchedules);


        let updatedEvent = { ...eventData };
        updatedEvent.schedule = tempSchedules;
        setEventData(updatedEvent);
    }
    //end of schedule


    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{

            const response = await axios.post(`http://event-management-app-backend.railway.internal/edit-event/${id}`, eventData)
            console.log(response)
            
            navigate(`/manage-event/${id}`);
            
        } catch(error){
            console.error(error)
        }
        console.log(eventData)
    }
    const handleInputChange = (event) =>{
        console.log(event.target.name, event.target.value)
        let temp = {...eventData};
        temp[event.target.name] = event.target.value;
        setEventData(temp);
    }
    const handleRuleChange = (e) =>{
        e.preventDefault();
        setRule({name: e.target.value});
        
    }
   
    const addRule = (e) =>{
        e.preventDefault();
        setRules((rules)=>[...rules, rule])
        const updatedEvent = eventData;
        const tempRules = updatedEvent.rules;
        tempRules.push(rule);
        updatedEvent.rules = tempRules;
        setEventData(updatedEvent);
        setRule({name: ""})
    }
    const removeRule = (index) =>{
        console.log(index);
        const tempRules = [...rules]; // Create a copy of schedules array
        tempRules.splice(index, 1);
        setRules(tempRules);


        let updatedEvent = { ...eventData };
        updatedEvent.rules = tempRules;
        setEventData(updatedEvent);
    }
    return ( 
        <div id="edit-event-page">
            <div className="page-title"><Link className="back-button" to={`/manage-event/${id}`}><img src={backArrow} alt=""></img></Link><p>Edit Event</p></div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Event Name</label>
                    <input type='text' className='form-control' name='name' value={eventData.name} onChange={handleInputChange}></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                        <input type='text' className='form-control' name='description' value={eventData.description} onChange={handleInputChange}></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Privacy</label>
                        <select type='text' className='form-control' name='isPublic' value={`${eventData.isPublic}`} onChange={handleInputChange}>
                            <option value={'true'}>Public</option>
                            <option value={'false'}>Private</option>
                        </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Joining</label>
                        <select type='text' className='form-control' name='isOpen' value={`${eventData.isOpen}`} onChange={handleInputChange}>
                            <option value={'true'}>Open</option>
                            <option value={'false'}>Closed</option>
                        </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                        <select type='text' className='form-control' name='isStarted' value={`${eventData.isStarted}`} onChange={handleInputChange}>
                            <option value={'true'}>Started</option>
                            <option value={'false'}>Not Started</option>
                        </select>
                </div>
                <div className='mb-3 row'>
                    <div className='col-6'>
                        <label className='form-label'>Duration</label>
                        <input type='text' className='form-control' name='duration' value={eventData.duration} onChange={handleInputChange}></input>
                    </div>
                    <div className='col-6'>
                        <label className='form-label'>Date</label>
                        <input type='date' className='form-control' name='date' onChange={handleInputChange}></input>
                    </div>
                </div>
      
                <div className='mb-3'>
                    <label className='form-label'>Location</label>
                    <input type='text' className='form-control mb-3' name='eventCountry'  value={eventData.eventCountry} onChange={handleInputChange} placeholder='Country'></input>
                    <input type='text' className='form-control mb-3' name='eventRegion'  value={eventData.eventRegion} onChange={handleInputChange} placeholder='Region/State'></input>
                    <input type='text' className='form-control mb-3' name='eventCity'  value={eventData.eventCity} onChange={handleInputChange} placeholder='City'></input>
                </div>
                <div className='mb-3 participants-inputs'>
                    <div className='participants-input'>
                        <label className='form-label'>Minimum number of participants</label>
                        <input type='number' className='form-control' name='minParticipants' value={eventData.minParticipants} onChange={handleInputChange}></input>
                    </div>
                    <div className='participants-input'>
                        <label className='form-label'>Maximum number of participants</label>
                        <input type='number' className='form-control' name='maxParticipants' value={eventData.maxParticipants} onChange={handleInputChange}></input>
                    </div>
                    
                    
                </div>
              
                <div className='mb-3'>
                    <label className='form-label'>Requirements</label>
                    <input type='text' className='form-control' name='requirements' value={eventData.requirements} onChange={handleInputChange}></input>
                </div>
                <div className='mb-3 schedule-section'>
                    <label className='form-label page-subheader'>Schedule</label>
                    <div className='schedule-container'>
                        {schedules.length > 0 ? (
                            
                                schedules.map((item, index)=>
                                (
                                <div className='schedule-body' key={`${index}-${item.name}`}>
                                    <strong>{item.start} - {item.end}</strong> 
                                    <p>{item.name}</p>
                                    <div className='remove-item-btn' onClick={()=>removeSchedule(index)}><img src={removeIcon} alt=''></img></div>
                                </div>
                                )
                            )
                        
                        ) : (
                            <h2>No schedules yet</h2>
                        )}
                    </div>
                    <div className='schedule-inputs'>
                        <input type='time' className='start-hour' name='start' value={scheduleInput.start} onChange={(e)=>handleScheduleInputChange(e, 'start')} placeholder='Start'></input>
                        <input type='time' className='end-hour' name='end' value={scheduleInput.end} onChange={(e)=>handleScheduleInputChange(e, 'end')} placeholder='End'></input>
                        <input type='text' className='name' name='name' value={scheduleInput.name} onChange={(e)=>handleScheduleInputChange(e, 'name')} placeholder='Name'></input>
                    </div>
                    <button className='basic-button' onClick={addSchedule}>Add</button>
                </div>
                    {/*add rules section */}
                    <div className='mb-3 schedule-section'>
                        <label className='page-subheader'>Rules</label>
                        <div className='schedule-container rules-container'>
                            {rules.length > 0 ? (
                                //TODO: fix - when I add one rule, it shows twice, but saved only once
                                    rules.map((item,index)=>
                                    (
                                    <div className='schedule-body' key={`rule${index}`}>
                                        <strong>{index+1}</strong> 
                                        <p>{item.name}</p>
                                        <div className='remove-item-btn' onClick={()=>removeRule(index)}><img src={removeIcon} alt=''></img></div>
                                    </div>
                                    )
                                )
                            
                            ) : (
                                <h2>No rules yet</h2>
                            )}
                        </div>
                        
                        <input className='form-control rule-input' name='name' value={rule.name} onChange={(e)=>handleRuleChange(e)} placeholder='Rule'></input>
                        
                        <button className='basic-button' onClick={addRule}>Add</button>
                        {/*add rules section end */}
                    </div>
                <div className='button-container'>
                    <button type='submit' className='basic-button width-90 mb-5'>Edit Event</button>
                </div>
            </form>
        </div>
     );
}
 
export default EditEvent;