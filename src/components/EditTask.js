import axios from "axios";
import {useState, useEffect} from 'react';



const EditTaskModal = ({taskId, hideEditTaskModal, participants}) => {


    const [taskData, setTaskData] = useState({})
    
    useEffect(()=>{
        try{
            axios.get(`http://localhost:5000/task/${taskId}`)
            .then(response=>{
                setTaskData(response.data)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        console.log(taskData)
        
    },[])


    const updateTaskData = (e, field) =>{
        let tempTask =  {...taskData};
        tempTask[field] = e.target.value;
        setTaskData(tempTask);

    }

    const updateTask = async (e) =>{
        e.preventDefault()
        try{
            axios.post(`http://localhost:5000/task/${taskId}/update`, taskData)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        hideEditTaskModal();
        window.location.reload();

    }
    

    return ( 
        
        <form className="edit-task-form" onSubmit={(e)=>updateTask(e)}>
                <label >Task Name</label>
                <input type="text" name="name" value={taskData.name} onChange={(e)=>updateTaskData(e, 'name')} required></input>
                <label>Description</label>
                <input type="text" name="description" value={taskData.description} onChange={(e)=>updateTaskData(e, 'description')}></input>
                <label>Due Date</label>
                <input type="date" name="date" value={taskData.date} onChange={(e)=>updateTaskData(e, 'date')}></input>
                <label>Priority</label>
                <select name="priority"  value={taskData.priority}  onChange={(e)=>updateTaskData(e,'priority')}>
                    <option value='high'>High</option>
                    <option value='standard' defaultValue>Standard</option>
                    <option value='low'>Low</option>
                </select>
                <select className="form-control" name="assignedTo" value={taskData.assignedTo} onChange={(e)=>updateTaskData(e, 'assignedTo')}>
                {participants.length > 0 && participants !== undefined ? (

                
                participants.map((item)=>(
                    <option value={`${item._id}`}>{item.username}</option>
                ))) : (
                    <p>Loading...</p>
                )
                }
                
            </select>
            <button className="basic-button">Save</button>
        </form>
                    
     );
}
 
export default EditTaskModal;