import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

function PostCard({ post }) {

    const navigate = useNavigate();
    const navigateToPost = () => {
        navigate(`/posts/${id}`)
    }
    const handleSeePostClick = (postId) => {
        navigateToPost()
    }

    const { id, title, user, content, number_of_comments, time } = post
    const { username, avatar } = user;

    return (
        <div className="post-card-container">
            <div className="mask mask-squircle w-16 h-16">
                <Link to={user['id'] ? `/readers/${user['id']}` : `/home`}>
                    <img src={avatar ? avatar : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                </Link>
            </div>
            <div className="post-card-details-container">
                <h1 className="post-title">{title}</h1>
                <small>by {username} on {time}</small>
                <p className="post-card-content">{content.length > 200 ? content.slice(0, 200) + "..." : content}</p>
                <small style={{fontStyle:'italic'}}>{number_of_comments} comments</small>
                <button onClick={handleSeePostClick} className="btn post-card-details-button">Go to This Post</button>
            </div>
            
        </div>
    );
}

export default PostCard;