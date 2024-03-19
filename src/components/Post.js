import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDbDate } from "../functions";
import heartIcon from './icons/heart.svg';
import commentIcon from './icons/comment.svg';
import sendIcon from './icons/send.svg';
import deleteIcon from './icons/delete.svg';
import profilePlaceholder from './icons/profile-placeholder.png';
import deleteEmptyIcon from "./icons/delete-empty.svg";
import editIcon from "./icons/edit.svg";
import "../stylings/post.css";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "../contexts/AuthContext";


const Post = () => {

    const {id} = useParams();
    const [postData, setPostData] = useState(null)
    const [comments, setComments] = useState([])
    const [commentData, setCommentData] = useState(null)
    const {user} = useAuth();
    const navigate = useNavigate();
    const [showEditPost, setShowEditPost] = useState(false)
    const [postUpdateData, setPostUpdateData] = useState('')

    useEffect(()=>{
        try{
            axios.get(`http://event-management-app-backend-production.up.railway.app/post/${id}`)
            .then(response=>{
                setPostData(response.data); 
                setPostUpdateData(response.data.text)
                setComments(response.data.comments)
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
    },[])



    const deleteComment = async (id) =>{
        try{
            axios.delete(`http://event-management-app-backend-production.up.railway.app/comment/${id}/delete`)
            .then(response=>{
                console.log(response)
                window.location.reload();
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        console.log('Comment was deleted')
        
    }
    const deletePost = async (id) =>{
        try{
            axios.delete(`http://event-management-app-backend-production.up.railway.app/post/${id}/delete`)
            .then(response=>{
                console.log(response)
                navigate('/social')
            })
            .catch(error=>console.log(error))
        } catch (error){
            console.log(error)
        }
        console.log('Post was deleted')
    }

    const handleCommentInput = (e)=>{
        setCommentData(e.target.value);
        console.log(commentData)
    }
    const handleSendComment = async (e) =>{
        let comment = {
            author: user._id,
            authorUsername: user.username,
            post: postData._id,
            text: commentData
        }
        try {
            const response = await axios.post('http://event-management-app-backend-production.up.railway.app/comment', comment);
            console.log('Comment created successfully!', response.data);
            setCommentData(null);
            window.location.reload();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }
    const editPost = (id) =>{
        setShowEditPost(true);
    }
    const handlePostChange = (e) =>{
        setPostUpdateData(e.target.value)
    }
    const handlePostUpdate = async () =>{
        let post = {...postData};
        post.text = postUpdateData;
        console.log(post)
        try {
            const response = await axios.post(`http://event-management-app-backend-production.up.railway.app/post/${postData._id}/update`, post);
            console.log('Post created successfully!', response.data);
            window.location.reload();
          } catch (error) {
            console.error('Error creating post:', error);
          }
    }
    return ( 
        <div id="post-page">
            <div className="page-title">View Post</div>
            {postData ? (
                <div className={'post-body'}>
                <div className="post-top">
                    <div className="author-name">{postData.authorUsername}</div>
                    <div className="post-date">{formatDbDate(postData.createdAt)}</div>
                </div>
                <div className={`post-content ${showEditPost ? 'edit-mode' : ''}`}>
                    <p className={!showEditPost ? "" : "hide"}>{postData.text}</p>
                    <textarea className={showEditPost ? "show" : "hide"} value={postUpdateData} onChange={handlePostChange} maxLength={160}></textarea>
                    <button className={`send-comment-btn ${showEditPost ? "show" : "hide"}`}  onClick={handlePostUpdate}><img className="medium-icon" src={sendIcon} alt="" /></button>
                </div>
                <div className={`caption ${showEditPost ? "" : "hide"}`}>
                    <button className={`cancel-button ${showEditPost ? "" : "hide"}`} onClick={()=>setShowEditPost(false)}>Cancel</button>
                    {postUpdateData ? postUpdateData.length : 0}/160 characters
                </div>
                <div className={`post-bottom ${showEditPost ? "hide" : ""}`}>
                    <div className="counter">
                        <img src={heartIcon} alt="" className="small-icon"></img>
                        <p>{postData.likes}</p>
                    </div>
                    <div className="counter">
                        <img src={commentIcon} alt="" className="small-icon"></img>
                        <p>{postData.comments.length}</p>
                    </div>
                    {user && postData.author === user._id ? (
                            <div className="manage-post-btns">
                                <button className="delete-post-btn" onClick={()=>editPost(postData._id)}>
                                    <img src={editIcon} className="medium-icon" alt="edit button"></img>
                                </button>
                                <button className="delete-post-btn" onClick={()=>deletePost(postData._id)}>
                                    <img src={deleteEmptyIcon} className="medium-icon" alt="delete button"></img>
                                </button>
                            </div>
                            
                    ) : (<></>)}
                    
                </div>
                <div className={`post-comment-input ${showEditPost ? "hide" : ""}`}>
                    <input type="text" name="comment" onChange={handleCommentInput} placeholder="Write a comment" maxLength={60}></input>
                    
                    <button className="send-comment-btn" onClick={handleSendComment}><img className="medium-icon" src={sendIcon} alt="" /></button>
                </div>
                <div className={`caption ${showEditPost ? "hide" : ""}`}>{commentData ? commentData.length : 0}/60 characters</div>
                
                
            </div>
            ) : (
                <p>Post is loading....</p>
            )}
            <p className="social-subtitle"><strong>All Comments</strong></p>
            {postData ? (
                <div className="comments-container">
                    {comments.length > 0 ? (
                        comments.map((item, index)=>(
                            <div className="comment-body" key={"comment"+index}>
                                <img src={profilePlaceholder} alt=""></img>
                                <div className="comment-content">
                                    <div className="comment-top">
                                        <p>{item.authorUsername}</p>
                                        <p>{formatDbDate(item.createdAt)}</p>
                                    </div>
                                    <div className="comment-bottom">
                                        {item.text}
                                    </div>
                                    {user && (item.author === user._id || user._id === postData.author) ? (
                                        <div className="delete-btn-container">
                                            <button onClick={()=>deleteComment(item._id)}>
                                                <img className="delete-btn-img" src={deleteIcon} alt=""/>
                                            </button>
                                        </div>
                                    ) : (<></>)}
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>There are no comments yet.</p>
                    )}
                </div>
            ) : (
                <p>Comments are loading....</p>
            )}
            <MobileNavbar />
        </div>
     );
}
 
export default Post;