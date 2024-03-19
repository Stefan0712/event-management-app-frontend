import axios from "axios";
import {useState, useEffect} from 'react'

const EditList = (listId) => {

    const [listData, setListData] = useState({})


    useEffect(()=>{
        try{
            axios.get(`http://event-management-app-backend-production.up.railway.app/list/${listId}`)
            .then(response=>{
                setListData(response.data)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    },[])


    return ( 
        <form className="edit-list-form" >
                            <button onClick={(e) => {
                                e.preventDefault()
                                setShowEditListModal(false)
                                }}>X</button>
                            <div className="mb-3">
                            <label className="form-label">List Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={listData.title}
                                onChange={handleInputChange}
                                required
                            />
                            </div>
                            <div className="mb-3">
                            <label className="form-label">List Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={listData.description}
                                onChange={handleInputChange}
                            />
                            </div>
                            <button type="submit" className="btn btn-primary">Save List</button>
                        </form>
     );
}
 
export default EditList;