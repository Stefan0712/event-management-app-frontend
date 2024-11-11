import axios from "axios";
import { useState, useEffect } from 'react';


const AddTask = ({listId, hideAddTaskModal, authorId, authorUsername, participants}) => {

    const [taskData, setTaskData] = useState({listId: '', name: '', author: '', authorId: '',assignedTo: '', description: '', deadline: '', priority: 'standard', status: 'not-started', isCompleted: false})
    const updateNewTaskInput = (e, field) =>{
        setTaskData(prevData => ({
            ...prevData,
            [field]: e.target.value,
          }));
    }

    
    const handleAddTaskSubmit = (e) =>{
        e.preventDefault()

        let dataToSend = taskData;
        if(dataToSend.assignedTo === ''){
            dataToSend.assignedTo = authorId;
        }
        dataToSend.listId = listId;
        dataToSend.author = authorId;
        dataToSend.authorUsername = authorUsername;
        console.log(dataToSend)
        try{
            axios.post(`http://localhost:5000/task`, dataToSend)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        window.location.reload();

    }
    const closeModal = (e) =>{
        e.preventDefault();
        hideAddTaskModal();
    }
    return ( 
        <form data-bs-theme="dark" className="add-task-form" onSubmit={handleAddTaskSubmit}>
            <div className="page-title">Add Task</div>
            <input className="form-control" type="text" name="name" onChange={(e)=>updateNewTaskInput(e, 'name')} required placeholder="Task Name"></input>
            <input className="form-control" type="text" name="description" onChange={(e)=>updateNewTaskInput(e, 'description')} placeholder="Task Description"></input>
            <label className="form-label">Deadline</label>
            <input className="form-control" type="date" name="date" onChange={(e)=>updateNewTaskInput(e, 'deadline')}></input>
            <select className="form-control" name="priority"  onChange={(e)=>updateNewTaskInput(e, 'priority')}>
                <option value='high'>High Priority</option>
                <option value='standard' defaultValue>Standard Priority</option>
                <option value='low'>Low Priority</option>
            </select>
            <label className="form-label">Assigned User</label>
            <select className="form-control" name="assignedTo" onChange={(e)=>updateNewTaskInput(e, 'assignedTo')}>
                {participants.length > 0 && participants !== undefined ? (

                
                participants.map((item, index)=>(
                    <option value={`${item._id}`} key={"participant-"+index}>{item.username}</option>
                ))) : (
                    <p>Loading...</p>
                )
                }
                
            </select>
            <div className="button-container">
                <button type="submit" className="basic-button">Add Task</button>
                <button type="button" className="basic-button hollow" onClick={closeModal}>Cancel</button>
            </div>
        </form>
            
     );
}
 
export default AddTask;