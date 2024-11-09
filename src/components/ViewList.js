import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../stylings/viewList.css';
import editIcon from './icons/edit.svg';
import EditTask from './EditTask'
import AddTask from "./AddTask";
import closeIcon from './icons/close.svg';
import notFinishedIcon from './icons/not-finished.svg';
import inProgressIcon from './icons/in-progress.svg';
import calendarIcon from './icons/calendar.svg';
import finishedIcon from './icons/finished.svg';
import deleteTaskIcon from './icons/deleteTask.svg';
import editTaskIcon from './icons/editTask.svg';
import authorIcon from './icons/author.svg';
import assignedToIcon from './icons/assignedTo.svg';
import MobileNav from './MobileNavbar';
import backArrow from './icons/back-arrow.svg';
import { useAuth } from "../contexts/AuthContext";
import { formatDbDate } from "../functions";
import Navbar from './Navbar'


{/*TODO: implement a modal for editing the list or a separate page*/}


const ViewList = () => {

    const [clickedTask, setClickedTask] = useState(-1)
    const [listData, setListData] = useState(null)
    const { id } = useParams()
    const [showEditListModal, setShowEditListModal] = useState(false)
    const [showEditTaskModal, setShowEditTaskModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState({taskId: '',listId: '', name: '', author: 'Stefan', description: '', dueDate: '', priority: 'standard', status: 'not-started', isCompleted: false})
    const [tasks, setTasks] = useState([])
    const [showAddTaskModal, setShowAddTaskModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedTaskForDeletion, setSelectedTaskForDeletion] = useState(null)
    const {user} = useAuth();
    const [eventParticipants, setEventParticipants] = useState([])

    useEffect(()=>{
        fetchList(id);
        fetchTasks(id);
    },[])


    const fetchList = (id) =>{
        try{
            axios.get(`http://localhost:5000/list/${id}`)
            .then(response=>{
                setListData(response.data.list)
                setEventParticipants(response.data.participants)

            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }

    const fetchTasks = async (id) =>{
        try{
            axios.get(`http://localhost:5000/list/${id}/tasks`)
            .then(response=>{
                setTasks(response.data)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    }

    //sets active task
    const handleClickedTask = (index) =>{
        if(index === clickedTask){
            setClickedTask(-1)
        }else{
            setClickedTask(index)
        }
    }
    //toggles the edit task modal
    const editTaskModal = (taskId) =>{
        setSelectedTask(taskId)
        console.log(taskId)
        setShowEditTaskModal(true)
    }
   

    

    const hideEditTaskModal = () =>{
        setShowEditTaskModal(false)
    }
    const hideAddTaskModal = () =>{
        setShowAddTaskModal(false)
    }
    //sends a delete request to the backend to find and delete the task with the id from the database
    //TODO: Fix task being deleted only from the Tasks colelction and not from individual users profiles.
    const deleteTask = async (id) =>{
        try{
            axios.delete(`http://localhost:5000/task/${id}/delete`)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        window.location.reload();
        console.log('task was deleted')
    }
    const toggleAddTaskModal = () =>{
        if(showAddTaskModal){
            setShowAddTaskModal(false)
        }else{
            setShowAddTaskModal(true)
        }
    
    }
    //sets a post request to change isCompleted to the opposite of what is it now and then reloads the page
    const handleCheckboxChange = (taskId, isCompleted) =>{
        const completion = {completion: !isCompleted};
        try{
            axios.post(`http://localhost:5000/task/${taskId}/completion`, completion)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        window.location.reload();
    }
    const showConfirmationModal = (id) =>{
        setSelectedTaskForDeletion(id)
        setShowConfirmModal(true);
    }
    return ( 
        <div id="view-list-page">
            <Navbar />
            {listData !== null ? (<div className="page-title"><Link className="back-button" to={`/view-event/${listData.event}`}><img src={backArrow} alt=""></img></Link>{listData.title}<img alt="" className="edit-btn" src={editIcon} onClick={() => setShowEditListModal(true)}></img></div>) : (<div></div>)}
            {listData !== null ? (<div className="page-title-desktop"><Link className="back-button" to={`/view-event/${listData.event}`}><img src={backArrow} alt=""></img></Link>{listData.title}<img alt="" className="edit-btn" src={editIcon} onClick={() => setShowEditListModal(true)}></img></div>) : (<div></div>)}
            {listData !== null ? (
                <div className="list-body">
                    <div className="list-author"><strong>Author:</strong> <p>{user.username}</p></div>
                    <div className="list-description"><strong>Description:</strong><p>{listData.description.length > 0 ? listData.description : "No description provided."}</p></div>
                    <div className="page-subheader">Stats</div>
                    <div className="list-stats">
                        <div className="stat-body">
                            <strong>{tasks.filter((task)=>task.isCompleted===false).length}</strong>
                            <p>Not Started</p>
                            <img className="stat-icon" src={notFinishedIcon} alt=""></img>
                        </div>
                        <div className="stat-body">
                            <strong>0</strong>
                            <p>Started</p>
                            <img className="stat-icon" src={inProgressIcon} alt=""></img>
                        </div>
                        <div className="stat-body">
                            <strong>{tasks.filter((task)=>task.isCompleted).length}</strong>
                            <p>Completed</p>
                            <img className="stat-icon" src={finishedIcon} alt=""></img>
                        </div>
                    </div>
                    <div className="page-subheader">Tasks</div>
                    <div className="list-tasks-container">
                        {tasks.length > 0 ? (
                            tasks.map((task, index)=>(
                            <div className={`task-body ${index === clickedTask ? 'show-task' : ''}`} key={`task-${index}`}>
                                <div className="top">
                                    <div className={`task-priority ${task.priority}-priority-tag`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</div>
                                    <p className="task-name" onClick={()=> handleClickedTask(index)}>{task.name}</p>
                                    <input className="task-checkbox" type="checkbox" checked={task.isCompleted} onChange={() => handleCheckboxChange(task._id, task.isCompleted)}></input>
                                    
                                </div>
                                <div className="bottom">
                                    <div className="info">
                                        <p className="task-description">{task.description.length > 0 ? task.description : "No task description was given."}</p>
                                        <div className="task-footer">
                                            <div className="icon-text">
                                                <img className="small-icon" src={calendarIcon} alt=""></img>
                                                <p>{formatDbDate(task.deadline)}</p>
                                            </div>
                                            <div className="icon-text">
                                                <img className="small-icon" src={assignedToIcon} alt=""></img>
                                                <p>{task.assignedTo.username}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="task-meta">

                                        <div className="task-row">
                                            <img className="small-icon" src={authorIcon} alt=""></img>
                                            <p>{task.authorUsername}</p>
                                        </div>
                                        <div className="task-btns">
                                            {user._id === task.author || user._id === listData.author ? (

                                                <div className="buttons">
                                                    <button className="delete-task-btn task-btn" onClick={()=>showConfirmationModal(task._id)}><img className="button-icon" alt="" src={deleteTaskIcon}></img></button>
                                                    <button className="edit-task-btn task-btn" onClick={()=>editTaskModal(task._id)}><img className="button-icon" alt="" src={editTaskIcon}></img></button>
                                                </div>
                                                ) : (
                                                <div></div>
                                                )}
                                        </div>
                                    </div>
                                    
                                        
                                       
                                    
                                    
                                </div>
                            </div>
                            ))
                        ) : (<p>There are no tasks yet.</p>)}
                        
                    </div>
                    <button className="basic-button" onClick={toggleAddTaskModal}>Add Task</button>
                    <div className={`add-task-modal ${showAddTaskModal ? 'show-add-task-modal' : ''}`}>
                        {user && eventParticipants.length > 0 ? (
                            <AddTask hideAddTaskModal={hideAddTaskModal} listId={id} authorId={user._id} authorUsername={user.username} participants={eventParticipants}/>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    
                    
                    <div className={`edit-task-modal ${showEditTaskModal ? 'show-edit-task-modal' : ''}`} >
                        <button className="close-modal-button" onClick={() => setShowEditTaskModal(false)}><img src={closeIcon} alt=""></img></button>
                        {selectedTask.taskId !== '' ? (
                            <EditTask hideEditTaskModal={hideEditTaskModal} taskId={selectedTask} participants={eventParticipants}/>
                        ) : ( <h1>There was an error fetching the task</h1>)
                        }
                    </div>
                    
                    <div className={`confirm-delete-modal ${showConfirmModal ? "show" : ""}`}>
                        <div className="msg">Are you sure you want to delete this task?</div>
                        <div className="modal-buttons">
                            <button className="basic-button red-button" onClick={()=>deleteTask(selectedTaskForDeletion)}>Delete Task</button>
                            <button className="basic-button" onClick={()=>setShowConfirmModal(false)}>Cancel</button>
                        </div>
                    </div>  
                </div>
            ) : (
                <h1>Edit Modal Hidden</h1>
            )}
            <MobileNav />
        </div>
     );
}
 
export default ViewList;