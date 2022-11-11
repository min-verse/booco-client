import React from 'react';
import { useNavigate } from 'react-router';

function PostCard({post}){

    const navigate = useNavigate();
    const navigateToPost = ()=>{
        navigate(`/posts/${id}`)
    }
    const handleSeePostClick = (postId) =>{
        navigateToPost()
    }

    const {id, title, user, content, number_of_comments, time} = post
    const {username} = user;

    return (
        <div className="post-card-container">
            <h1>{title}</h1>
            <small>by {username} on {time}</small>
            <p>{content.length > 200 ? content.slice(0,200)+"..." : content}</p>
            <small>{number_of_comments} comments</small>
            <button onClick={handleSeePostClick} className="btn">See Post</button>
        </div>
    );
}

export default PostCard;