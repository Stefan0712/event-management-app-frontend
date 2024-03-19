import "../stylings/social.css";
import heartIcon from './icons/heart.svg';
import commentIcon from './icons/comment.svg';
import MobileNavbar from "./MobileNavbar";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {formatDbDate} from '../functions.js';
import { Link } from "react-router-dom";


const Social = () => {

    const {user} = useAuth();
    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
        try{
            axios.get(`http://event-management-app-backend.railway.internal/post/all`)
            .then(response=>{
                setPosts(response.data); 
                console.log(response.data.comments)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    },[])




  

    const handlePostSubmit = async (e) =>{
        
        let post = {
            author: user._id,
            authorUsername: user.username ,
            text: postData
        }
        try {
            const response = await axios.post('http://event-management-app-backend.railway.internal/post', post);
            console.log('Post created successfully!', response.data);
            setPostData(null);
            window.location.reload();
          } catch (error) {
            console.error('Error creating post:', error);
          }
    }


    const handleInputChange = (e) => {
        setPostData(e.target.value);  
    }
    return ( 
        <div id="social-page">
            <div className="page-title">Social Page</div>
            <div className="post-form">
                <label><strong>Write a post</strong></label>
                <textarea name="text" placeholder="Write your post here..." value={postData} onChange={(e)=>handleInputChange(e,'post')} maxLength={160}></textarea>
                <div className="caption">{postData ? postData.length : 0}/160 characters</div>
                <button className="basic-button" onClick={handlePostSubmit}>Post</button>
            </div>
            <p className="social-subtitle"><strong>All Posts</strong></p>
            <div className="posts-container">
                {posts && posts.length > 0 ? (

                    posts.map((item, index)=>(
                    <Link to={`/post/${item._id}`} className={'post-body'} key={"post"+index}>
                        <div className="post-top">
                            <div className="author-name">{item.authorUsername}</div>
                            <div className="post-date">{formatDbDate(item.createdAt)}</div>
                        </div>
                        <div className="post-content">{item.text}</div>
                        <div className="post-bottom">
                            <div className="counter">
                                <img src={heartIcon} alt="" className="small-icon"></img>
                                <p>{item.likes}</p>
                            </div>
                            <div className="counter">
                                <img src={commentIcon} alt="" className="small-icon"></img>
                                <p>{item.comments.length}</p>
                            </div>
                        </div>
                    </Link>
                   
                    ))
                
                ) : (
                    <p>Posts are loading...</p>
                )}
                
            </div>
            <MobileNavbar />
        </div>
     );
}
 
export default Social;