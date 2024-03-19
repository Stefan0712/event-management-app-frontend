import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CreateList = ({eventId, closeCreateListModal}) => {
  const [listData, setListData] = useState({
    title: '',
    description: '',
    event: eventId
  });
  const {user} = useAuth();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListData({ ...listData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = listData;
      data.author = user._id;
      const response = await axios.post('http://event-management-app-backend.railway.internal/list', data);
      console.log('List created successfully!', response.data);
      setListData({ title: '', description: '' });
      closeCreateListModal();
      window.location.reload();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <div id="create-list">
      <form onSubmit={handleSubmit}>
        <div className='form-title'>Create a new list</div>
        <input type="text" name="title" onChange={handleInputChange} required placeholder='List Title'/>
        <input type="text" name="description" onChange={handleInputChange} placeholder='List Description'/>
        <div className='modal-buttons'>
          <button type="submit" className="basic-button">Create List</button>
          <button className="basic-button red-button hollow" onClick={closeCreateListModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
